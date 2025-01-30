import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"
import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminCreateDoctorForm } from "@/app/dashboard/(helpers)/_components/doctors/create-form"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { redirect } from "next/navigation"

export default async function PatientCreatePage() {
  const pageTitle = <span>Create Doctor</span>

  const hasAccessToCreatePromise = hasAccessTo("doctors", "create-doctor")
  const [hasAccessToView] = await Promise.all([hasAccessToCreatePromise])
  if (!hasAccessToView) return redirect(employeesRoutes.dashboard.root)

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <AdminCreateDoctorForm />
    </div>
  )
}
