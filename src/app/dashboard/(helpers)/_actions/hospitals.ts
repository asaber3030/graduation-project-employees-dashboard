"use server"

import bcrypt from "bcrypt"
import db from "@/services/prisma"
import z from "zod"

import { HospitalSchema } from "@/schema"
import { SearchParams } from "@/types"

import { actionResponse, responseCodes } from "@/lib/api"
import { createPagination } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { employeesRoutes } from "../_utils/routes"
import { uploadToCloudinary } from "@/actions/app"

export async function getHospitals() {
  return await db.hospital.findMany({
    orderBy: { createdAt: "desc" }
  })
}

export async function paginateHospitals(searchParams: SearchParams) {
  const total = await db.hospital.count()
  const pagination = createPagination(searchParams, total)
  const hospitals = await db.hospital.findMany({
    where: {
      OR: [{ name: { contains: searchParams.search ?? "" } }, { location: { contains: searchParams.search ?? "" } }]
    },
    ...pagination.args
  })

  return {
    hospitals,
    ...pagination
  }
}

export async function updateHospitalAction(id: number, data: z.infer<typeof HospitalSchema.update>, formData?: FormData) {
  try {
    const hospital = await db.hospital.findUnique({ where: { id } })
    let logo = hospital?.logo

    if (formData) {
      const file = formData.get("logo") as File

      if (file && file.size > 0) {
        logo = await uploadToCloudinary(file, "hospitals")
      }
    }

    await db.hospital.update({
      where: { id },
      data: {
        ...data,
        logo
      }
    })

    revalidatePath(employeesRoutes.hospitals.root)
    revalidatePath(employeesRoutes.hospitals.update(id))
    revalidatePath(employeesRoutes.hospitals.view(id))

    return actionResponse(responseCodes.ok, "Hospital updated successfully")
  } catch (error) {
    console.error("Hospital update error:", error)
    return actionResponse(responseCodes.serverError, "Failed to update hospital")
  }
}

export async function changeHospitalPasswordAction(id: number, data: z.infer<typeof HospitalSchema.changePassword>) {
  try {
    const { currentPassword, newPassword } = data

    const hospital = await db.hospital.findUnique({
      where: { id }
    })

    if (!hospital || !hospital.password) {
      return actionResponse(responseCodes.notFound, "Hospital not found")
    }

    const isMatch = await bcrypt.compare(currentPassword, hospital.password)
    if (!isMatch) {
      return actionResponse(responseCodes.unauthorized, "Current password is incorrect")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await db.hospital.update({
      where: { id },
      data: { password: hashedPassword }
    })

    return actionResponse(responseCodes.ok, "Password updated successfully")
  } catch (error) {
    console.error("Change password error:", error)
    return actionResponse(responseCodes.serverError, "Failed to change password")
  }
}
