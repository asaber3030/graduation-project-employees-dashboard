"use server"

import db from "@/services/prisma"

import { createPagination } from "@/lib/utils"

import { SearchParams } from "@/types"
import { Prisma } from "@prisma/client"

export async function paginateVaccinations(searchParams: SearchParams, patientId: number) {
  const total = await countPatientVaccinationsByPatientId(patientId)
  const pagination = createPagination(searchParams, total)
  const where: Prisma.PatientVaccinationWhereInput = {
    patientId,
    OR: [{ vaccineName: { contains: searchParams.search ?? "" } }],
  }

  const vaccinations = await db.patientVaccination.findMany({
    where,
    include: {
      patient: true,
    },
    ...pagination.args,
  })

  return {
    vaccinations,
    ...pagination,
  }
}

export async function countPatientVaccinationsByPatientId(patientId: number) {
  return db.patientVaccination.count({
    where: { patientId },
  })
}
