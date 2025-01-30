"use server"

import db from "@/services/prisma"

import { actionResponse, responseCodes } from "@/lib/api"
import { currentHospital, uploadFile } from "@/actions/app"
import { createPagination } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { employeesRoutes } from "../_utils/routes"
import { v4 as uuid } from "uuid"
import { z } from "zod"

import { MedicineSchema } from "@/schema"
import { SearchParams } from "@/types"
import { Prisma } from "@prisma/client"

export async function findMedicine(record: Prisma.MedicineWhereUniqueInput) {
  const medicine = await db.medicine.findUnique({
    where: record,
    include: { dosageForm: true, hospital: true, inventory: true }
  })
  return medicine
}

export async function paginateMedicine(searchParams: SearchParams) {
  const hospital = await currentHospital()
  const total = await db.medicine.count({
    where: { hospitalId: hospital.id }
  })
  const pagination = createPagination(searchParams, total)
  const medicine = await db.medicine.findMany({
    where: {
      OR: [
        { enName: { contains: searchParams.search ?? "" } },
        { arName: { contains: searchParams.search ?? "" } }
      ],
      hospitalId: hospital.id
    },
    include: { dosageForm: true, hospital: true },
    ...pagination.args
  })

  return {
    medicine,
    ...pagination
  }
}

export async function searchMedicine(search?: string) {
  const medicine = await db.medicine.findMany({
    where: {
      OR: [{ enName: { contains: search } }, { arName: { contains: search } }]
    },
    take: 10
  })
  return medicine
}

export async function updateMedicineAction(
  medicineId: number,
  dosageFormId: number,
  inventoryId: number,
  data: z.infer<typeof MedicineSchema.update>,
  formData?: FormData
) {
  const medicine = await db.medicine.findUnique({
    where: { id: medicineId },
    select: { image: true, barcode: true, id: true }
  })
  let image = medicine?.image
  let barcode = medicine?.barcode

  if (formData) {
    const imageFile = formData.get("image") as File
    const barcodeFile = formData.get("barcode") as File

    if (imageFile) {
      const imageFileName = uuid() + "_" + imageFile.name
      const imagePath = `medicine/${imageFileName}`
      image = await uploadFile(imageFile, "main", imagePath)
    }

    if (barcodeFile) {
      const barCodeFileName = uuid() + "_" + barcodeFile.name
      const barcodePath = `medicine/${barCodeFileName}`
      barcode = await uploadFile(barcodeFile, "main", barcodePath)
    }
  }

  await db.medicine.update({
    where: { id: medicineId },
    data: {
      ...data,
      image,
      barcode,
      dosageFormId,
      inventoryId
    }
  })

  revalidatePath(employeesRoutes.medicine.root)
  revalidatePath(employeesRoutes.medicine.update(medicineId))
  return actionResponse(responseCodes.ok, "Medicine updated successfully")
}

export async function createMedicineAction(
  dosageFormId: number,
  inventoryId: number,
  data: z.infer<typeof MedicineSchema.create>,
  formData: FormData
) {
  if (!dosageFormId) return actionResponse(400, "Dosage Form is required")
  if (!inventoryId) return actionResponse(400, "Inventory is required")

  const hospital = await currentHospital()

  const imageFile = formData.get("image") as File
  const barcodeFile = formData.get("barcode") as File

  if (!imageFile) return actionResponse(400, "Image is required")
  if (!barcodeFile) return actionResponse(400, "Barcode Image is required")

  const imageFileName = uuid() + "_" + imageFile.name
  const barCodeFileName = uuid() + "_" + barcodeFile.name

  const imagePath = `medicine/${imageFileName}`
  const barcodePath = `medicine/${barCodeFileName}`

  const image = await uploadFile(imageFile, "main", imagePath)
  const barcode = await uploadFile(barcodeFile, "main", barcodePath)

  await db.medicine.create({
    data: {
      ...data,
      image,
      barcode,
      dosageFormId,
      inventoryId,
      hospitalId: hospital.id
    }
  })

  revalidatePath(employeesRoutes.medicine.root)
  return actionResponse(responseCodes.ok, "Medicine created successfully")
}

export async function deleteMedicineAction(id: number) {
  try {
    await db.medicine.delete({
      where: { id }
    })
    return actionResponse(200, "Medicine has been deleted.")
  } catch (error) {
    return actionResponse(400, "Failed to delete.")
  }
}
