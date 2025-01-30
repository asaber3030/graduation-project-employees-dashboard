import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminPatientVaccinationsTable } from "@/app/dashboard/(helpers)/_components/vaccinations/table"
import { PatientResourceTitle } from "@/app/dashboard/(helpers)/_components/patients/patient-resource-title"
import { SearchParams } from "@/types"

import { paginateVaccinations } from "@/app/dashboard/(helpers)/_actions/vaccinations"
import { findPatient } from "@/app/dashboard/(helpers)/_actions/patients"
import { notFound } from "next/navigation"

type Props = {
  params: {
    patientId: string
  }
  searchParams: SearchParams
}

export default async function PatientIdVaccinationsPage({ params, searchParams }: Props) {
  const patientId = +params.patientId
  const patient = await findPatient({ id: patientId })

  if (!patient) return notFound()

  const pageTitle = <PatientResourceTitle patient={patient} resourceName='Vaccinations' />
  const vaccinations = await paginateVaccinations(searchParams, patientId)

  return (
    <div>
      <AdminPageTitle title={pageTitle}></AdminPageTitle>
      <AdminPatientVaccinationsTable
        hasNextPage={vaccinations.hasNextPage}
        data={vaccinations.vaccinations}
        searchParams={searchParams}
      />
    </div>
  )
}
