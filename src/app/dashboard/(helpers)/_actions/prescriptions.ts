"use server"

import db from "@/services/prisma"

import { Prisma } from "@prisma/client"
import { PrescriptionItemSchema } from "@/schema"
import { SearchParams } from "@/types"

import { createPagination } from "@/lib/utils"
import { currentHospital } from "@/actions/app"
import { actionResponse } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { employeesRoutes } from "../_utils/routes"
import { z } from "zod"

export async function paginatePrescriptions(
  searchParams: SearchParams,
  patientId?: number,
  hospitalId?: number
) {
  let hospital = await currentHospital()
  let specificId = hospital.id

  if (hospitalId) specificId = hospitalId

  const where: Prisma.PrescriptionWhereInput = {
    hospitalId: specificId
  }
  if (patientId) where.patientId = patientId

  const total = await db.prescription.count({
    where
  })
  const pagination = createPagination(searchParams, total)

  where.OR = [{ patient: { name: { contains: searchParams.search ?? "" } } }]

  const prescriptions = await db.prescription.findMany({
    where,
    include: {
      patient: true,
      doctor: true,
      hospital: true,
      _count: {
        select: { items: true }
      }
    },
    ...pagination.args
  })

  return {
    prescriptions,
    ...pagination
  }
}

export async function paginatePrescriptionsByDoctorId(
  searchParams: SearchParams,
  doctorId: number
) {
  const where: Prisma.PrescriptionWhereInput = {
    doctorId
  }

  const total = await db.prescription.count({
    where
  })
  const pagination = createPagination(searchParams, total)

  where.OR = [
    { patient: { name: { contains: searchParams.search ?? "" } } },
    { doctor: { name: { contains: searchParams.search ?? "" } } }
  ]

  const prescriptions = await db.prescription.findMany({
    where,
    include: {
      patient: true,
      doctor: true,
      hospital: true,
      _count: {
        select: { items: true }
      }
    },
    ...pagination.args
  })

  return {
    prescriptions,
    ...pagination
  }
}

export async function countPrescriptionsByPatientId(patientId: number) {
  return db.prescription.count({
    where: { patientId }
  })
}

export async function findPrescriptionById(id: number) {
  return db.prescription.findUnique({
    where: { id },
    include: {
      patient: true,
      hospital: true,
      doctor: true
    }
  })
}

export async function findPrescriptionMedications(id: number) {
  return db.prescriptionItem.findMany({
    where: { prescriptionId: id },
    include: {
      medicine: true
    }
  })
}

export async function createPrescriptionAction(patientId: number, doctorId: number) {
  const hospital = await currentHospital()

  if (!patientId || patientId === 0) return actionResponse(400, "Patient is invalid")
  if (!doctorId || doctorId === 0) return actionResponse(400, "Doctor is invalid")

  await db.prescription.create({
    data: {
      patientId,
      doctorId,
      hospitalId: hospital.id
    }
  })
  revalidatePath(employeesRoutes.prescriptions.root)
  return actionResponse(200, "Prescription created")
}

export async function updatePrescriptionAction(
  prescriptionId: number,
  patientId: number,
  doctorId: number
) {
  if (!patientId || patientId === 0) return actionResponse(400, "Patient is invalid")
  if (!doctorId || doctorId === 0) return actionResponse(400, "Doctor is invalid")

  const prescription = await db.prescription.findUnique({
    where: { id: prescriptionId }
  })

  const validPatientId = patientId || prescription?.patientId
  const validDoctorId = doctorId || prescription?.doctorId

  await db.prescription.update({
    where: { id: prescriptionId },
    data: {
      patientId: validPatientId,
      doctorId: validDoctorId
    }
  })
  revalidatePath(employeesRoutes.prescriptions.root)
  return actionResponse(200, "Prescription Updated.")
}

export async function deletePrescriptionAction(prescriptionId: number) {
  await db.prescription.delete({
    where: { id: prescriptionId }
  })
  revalidatePath(employeesRoutes.prescriptions.root)
  return actionResponse(200, "Prescription Deleted.")
}

export async function createPrescriptionItemAction(
  medicineId: number,
  prescriptionId: number,
  data: z.infer<typeof PrescriptionItemSchema.create>
) {
  if (!medicineId) return actionResponse(404, "Medicine not found")
  if (!prescriptionId) return actionResponse(404, "Medicine not found")

  await db.prescriptionItem.create({
    data: {
      ...data,
      medicineId,
      prescriptionId
    }
  })

  revalidatePath(employeesRoutes.prescriptions.view(prescriptionId))

  return actionResponse(200, "Prescription item created")
}

export async function updatePrescriptionItemAction(
  itemId: number,
  medicineId: number,
  data: z.infer<typeof PrescriptionItemSchema.update>
) {
  const item = await findPrescriptionItem(itemId)
  if (!item) return actionResponse(404, "Prescription item not found")

  let medicineIdNumber = item.medicineId

  if (medicineId) medicineIdNumber = medicineId

  await db.prescriptionItem.update({
    where: { id: itemId },
    data: {
      ...data,
      medicineId: medicineIdNumber
    }
  })
  revalidatePath(employeesRoutes.prescriptions.view(item?.prescriptionId))
  return actionResponse(200, "Prescription item updated")
}

export async function deletePrescriptionItemAction(itemId: number) {
  const item = await findPrescriptionItem(itemId)
  if (!item) return actionResponse(404, "Prescription item not found")

  await db.prescriptionItem.delete({
    where: { id: itemId }
  })
  revalidatePath(employeesRoutes.prescriptions.view(item.prescriptionId))
  return actionResponse(200, "Prescription item deleted")
}

export async function findPrescriptionItem(itemId: number) {
  return db.prescriptionItem.findUnique({
    where: { id: itemId }
  })
}
