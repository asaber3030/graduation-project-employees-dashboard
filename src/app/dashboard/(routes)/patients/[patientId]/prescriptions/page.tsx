import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { PatientResourceTitle } from "@/app/dashboard/(helpers)/_components/patients/patient-resource-title"
import { SearchParams } from "@/types"
import { AdminPrescriptionsTable } from "@/app/dashboard/(helpers)/_components/prescriptions/table"

import { paginatePrescriptions } from "@/app/dashboard/(helpers)/_actions/prescriptions"
import { findPatient } from "@/app/dashboard/(helpers)/_actions/patients"
import { notFound } from "next/navigation"

type Props = {
  params: {
    patientId: string
  }
  searchParams: SearchParams
}

export default async function PatientIdPrescriptionsPage({ params, searchParams }: Props) {
  const patientId = +params.patientId
  const patient = await findPatient({ id: patientId })

  if (!patient) return notFound()

  const pageTitle = <PatientResourceTitle patient={patient} resourceName='Prescriptions' />
  const prescriptions = await paginatePrescriptions(searchParams, patientId)

  return (
    <div>
      <AdminPageTitle title={pageTitle}></AdminPageTitle>
      <AdminPrescriptionsTable
        data={prescriptions.prescriptions}
        hasNextPage={prescriptions.hasNextPage}
        searchParams={searchParams}
      />
    </div>
  )
}
