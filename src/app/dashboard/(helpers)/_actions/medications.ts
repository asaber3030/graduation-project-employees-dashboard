"use server"

import db from "@/services/prisma"

import { createPagination } from "@/lib/utils"
import { SearchParams } from "@/types"
import { Prisma } from "@prisma/client"

export async function paginateMedications(searchParams: SearchParams, patientId: number) {
  const total = await countPatientMedicationsByPatientId(patientId)
  const pagination = createPagination(searchParams, total)
  const where: Prisma.PatientMedicationWhereInput = {
    patientId,
    OR: [
      { medicine: { enName: { contains: searchParams.search ?? "" } } },
      { medicine: { arName: { contains: searchParams.search ?? "" } } },
    ],
  }

  const medications = await db.patientMedication.findMany({
    where,
    include: {
      patient: true,
      medicine: true,
    },
    ...pagination.args,
  })

  return {
    medications,
    ...pagination,
  }
}

export async function countPatientMedicationsByPatientId(patientId: number) {
  return db.patientMedication.count({
    where: { patientId },
  })
}
