import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"
import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { CreatePatientForm } from "@/app/dashboard/(helpers)/_components/patients/create-form"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { redirect } from "next/navigation"

export default async function PatientCreatePage() {
  const pageTitle = <span>Create Patient</span>

  const hasAccessToCreatePromise = hasAccessTo("patients", "create-patient")
  const [hasAccessToCreate] = await Promise.all([hasAccessToCreatePromise])
  if (!hasAccessToCreate) return redirect(employeesRoutes.dashboard.root)

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <CreatePatientForm />
    </div>
  )
}
