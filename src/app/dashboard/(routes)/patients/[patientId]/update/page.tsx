import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { UpdatePatientForm } from "@/app/dashboard/(helpers)/_components/patients/update-form"

import { findPatient } from "@/app/dashboard/(helpers)/_actions/patients"
import { notFound, redirect } from "next/navigation"
import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"

type Props = {
  params: { patientId: string }
}

export default async function PatientIdUpdatePage({ params }: Props) {
  const patientId = +params.patientId
  const patient = await findPatient({ id: patientId })

  const hasAccessToUpdatePromise = hasAccessTo("patients", "update-patient")
  const [hasAccessToUpdate] = await Promise.all([hasAccessToUpdatePromise])
  if (!hasAccessToUpdate) return redirect(employeesRoutes.dashboard.root)

  if (!patient) return notFound()

  const pageTitle = (
    <span className='flex gap-2 items-center'>
      Update Patient
      <b>
        {patient.name} # {patient.nationalId}
      </b>
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <UpdatePatientForm patient={patient} />
    </div>
  )
}
