"use server"

import db from "@/services/prisma"
import bcrypt from "bcrypt"

import { Doctor, Prisma } from "@prisma/client"
import { DoctorSchema } from "@/schema"
import { SearchParams } from "@/types"

import { actionResponse, responseCodes } from "@/lib/api"
import { createPagination } from "@/lib/utils"
import { currentHospital } from "@/actions/app"
import { revalidatePath } from "next/cache"
import { employeesRoutes } from "../_utils/routes"
import { z } from "zod"

export async function getLimitDoctorLoginHistory(doctorId: number) {
  const loginHistory = await db.doctorLoginHistory.findMany({
    where: { doctorId },
    orderBy: { createdAt: "desc" },
    take: 5
  })
  return loginHistory
}

export async function paginateDoctors(searchParams: SearchParams) {
  const hospital = await currentHospital()
  const total = await db.doctor.count({
    where: { hospitalId: hospital.id }
  })
  const pagination = createPagination(searchParams, total)
  const doctors = await db.doctor.findMany({
    where: {
      OR: [
        { name: { contains: searchParams.search ?? "" } },
        { username: { contains: searchParams.search ?? "" } }
      ],
      hospitalId: hospital.id
    },
    include: { department: true, hospital: true },

    ...pagination.args
  })

  return {
    doctors,
    ...pagination
  }
}

export async function paginateDoctorsByDepartment(
  searchParams: SearchParams,
  departmentId: number
) {
  const hospital = await currentHospital()
  const total = await db.doctor.count({
    where: { hospitalId: hospital.id, departmentId }
  })
  const pagination = createPagination(searchParams, total)
  const doctors = await db.doctor.findMany({
    where: {
      OR: [
        { name: { contains: searchParams.search ?? "" } },
        { username: { contains: searchParams.search ?? "" } }
      ],
      hospitalId: hospital.id,
      departmentId
    },
    include: { department: true, hospital: true },

    ...pagination.args
  })

  return {
    doctors,
    ...pagination
  }
}

export async function findDoctor(record: Prisma.DoctorWhereUniqueInput) {
  const doctor = await db.doctor.findUnique({ where: record })
  if (!doctor) return null
  const { password, ...rest } = doctor
  return rest as Doctor
}

export async function updateDoctorAction(id: number, data: z.infer<typeof DoctorSchema.update>) {
  if (data.email) {
    const emailExists = await db.doctor.findFirst({
      where: { email: data.email, id: { not: id } },
      select: { id: true }
    })
    if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists")
  }

  if (data.username) {
    const usernameExists = await db.doctor.findFirst({
      where: { username: data.username, id: { not: id } },
      select: { id: true }
    })
    if (usernameExists) return actionResponse(responseCodes.badRequest, "Username already exists")
  }

  if (data.phoneNumber) {
    const phoneExists = await db.doctor.findFirst({
      where: { phoneNumber: data.phoneNumber, id: { not: id } },
      select: { id: true }
    })
    if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone Number already exists")
  }

  await db.doctor.update({
    where: { id },
    data
  })
  revalidatePath(employeesRoutes.doctors.root)
  revalidatePath(employeesRoutes.doctors.update(id))
  revalidatePath(employeesRoutes.doctors.view(id))
  return actionResponse(responseCodes.ok, "Doctor updated successfully")
}

export async function createDoctorAction(
  departmentId: number,
  data: z.infer<typeof DoctorSchema.create>
) {
  const hospital = await currentHospital()

  const usernameExists = await findDoctor({ username: data.username })
  if (usernameExists) return actionResponse(responseCodes.badRequest, "Username already exists")

  const emailExists = await findDoctor({ email: data.email })
  if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists")

  const phoneExists = await findDoctor({ phoneNumber: data.phoneNumber })
  if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone Number already exists")

  const hashedPassword = await bcrypt.hash(data.password, 10)

  await db.doctor.create({
    data: {
      ...data,
      departmentId,
      hospitalId: hospital.id,
      password: hashedPassword
    }
  })

  revalidatePath(employeesRoutes.doctors.root)
  return actionResponse(responseCodes.ok, "Doctor created successfully")
}

export async function deleteDoctorAction(id: number) {
  await db.doctor.delete({ where: { id } })
  revalidatePath(employeesRoutes.doctors.root)
  return actionResponse(responseCodes.ok, "Doctor deleted successfully")
}

export async function searchDoctors(search?: string) {
  const doctors = await db.doctor.findMany({
    where: {
      OR: [
        { name: { contains: search } },
        { username: { contains: search } },
        { email: { contains: search } }
      ],
      hospitalId: (await currentHospital()).id
    },
    take: 10
  })
  return doctors
}
