import React from "react"
import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminCreatePrescriptionForm } from "@/app/dashboard/(helpers)/_components/prescriptions/create-form"
import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { redirect } from "next/navigation"

export default async function CreatePrescriptionPage() {
  const hasAccessToCreatePromise = hasAccessTo("prescriptions", "create-prescription")
  const [hasAccessToCreate] = await Promise.all([hasAccessToCreatePromise])
  if (!hasAccessToCreate) return redirect(employeesRoutes.dashboard.root)

  return (
    <div>
      <AdminPageTitle title='Create Prescription' />
      <AdminCreatePrescriptionForm />
    </div>
  )
}
