"use server"

import db from "@/services/prisma"

import { Patient, Prisma } from "@prisma/client"
import { PatientSchema } from "@/schema"
import { SearchParams } from "@/types"

import { actionResponse, responseCodes } from "@/lib/api"
import { createPagination } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { employeesRoutes } from "../_utils/routes"
import { z } from "zod"

import bcrypt from "bcrypt"

export async function paginatePatients(searchParams: SearchParams) {
  const total = await db.patient.count()
  const pagination = createPagination(searchParams, total)
  const patients = await db.patient.findMany({
    where: {
      OR: [{ name: { contains: searchParams.search ?? "" } }]
    },
    ...pagination.args
  })

  return {
    patients,
    ...pagination
  }
}

export async function findPatient(record: Prisma.PatientWhereUniqueInput) {
  const patient = await db.patient.findUnique({ where: record })
  if (!patient) return null
  const { password, ...rest } = patient
  return rest as Patient
}

export async function updatePatientAction(id: number, data: z.infer<typeof PatientSchema.update>) {
  if (data.email) {
    const emailExists = await db.patient.findFirst({
      where: { email: data.email, id: { not: id } },
      select: { id: true }
    })
    if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists")
  }
  if (data.phoneNumber) {
    const phoneExists = await db.patient.findFirst({
      where: { phoneNumber: data.phoneNumber, id: { not: id } },
      select: { id: true }
    })
    if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone Number already exists")
  }

  await db.patient.update({
    where: { id },
    data
  })
  revalidatePath(employeesRoutes.patients.root)
  revalidatePath(employeesRoutes.patients.update(id))
  revalidatePath(employeesRoutes.patients.view(id))
  return actionResponse(responseCodes.ok, "Patient updated successfully")
}

export async function createPatientAction(data: z.infer<typeof PatientSchema.create>) {
  const emailExists = await findPatient({ email: data.email })
  if (emailExists) return actionResponse(responseCodes.badRequest, "Email already exists")

  const phoneExists = await findPatient({ phoneNumber: data.phoneNumber })
  if (phoneExists) return actionResponse(responseCodes.badRequest, "Phone Number already exists")

  const nationalExists = await findPatient({ nationalId: data.nationalId })
  if (nationalExists) return actionResponse(responseCodes.badRequest, "National ID already exists")

  const hashedPassword = await bcrypt.hash(data.password, 10)

  await db.patient.create({
    data: {
      ...data,
      password: hashedPassword,
      age: +data.age
    }
  })

  revalidatePath(employeesRoutes.patients.root)
  return actionResponse(responseCodes.ok, "Patient created successfully")
}

export async function searchPatients(search?: string) {
  const patients = await db.patient.findMany({
    where: {
      OR: [{ name: { contains: search } }, { email: { contains: search } }]
    },
    take: 10
  })
  return patients
}
