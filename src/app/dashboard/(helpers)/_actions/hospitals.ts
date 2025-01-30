"use server"

import db from "@/services/prisma"
import z from "zod"

import { HospitalSchema } from "@/schema"
import { SearchParams } from "@/types"

import { actionResponse, responseCodes } from "@/lib/api"
import { createPagination } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { employeesRoutes } from "../_utils/routes"
import { uploadFile } from "@/actions/app"
import { v4 as uuid } from "uuid"

export async function paginateHospitals(searchParams: SearchParams) {
  const total = await db.hospital.count()
  const pagination = createPagination(searchParams, total)
  const hospitals = await db.hospital.findMany({
    where: {
      OR: [
        { name: { contains: searchParams.search ?? "" } },
        { location: { contains: searchParams.search ?? "" } }
      ]
    },
    ...pagination.args
  })

  return {
    hospitals,
    ...pagination
  }
}

export async function updateHospitalAction(
  id: number,
  data: z.infer<typeof HospitalSchema.update>,
  formData?: FormData
) {
  try {
    const hospital = await db.hospital.findUnique({ where: { id } })
    let logo = hospital?.logo

    if (formData) {
      const file = formData.get("logo") as File
      const fileName = uuid() + "_" + file.name
      const path = `hospitals/${fileName}`
      logo = await uploadFile(file, "main", path)
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
    return actionResponse(responseCodes.serverError, "Failed to update hospital")
  }
}
