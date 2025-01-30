import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"
import React from "react"

import { AdminCreateEmployeeForm } from "@/app/dashboard/(helpers)/_components/employees/create-form"
import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { redirect } from "next/navigation"

export default async function CreateEmployeePage() {
  const hasAccessToCreatePromise = hasAccessTo("employees", "create-employee")
  const [handleAccessToCreate] = await Promise.all([hasAccessToCreatePromise])
  if (!handleAccessToCreate) return redirect(employeesRoutes.dashboard.root)

  return (
    <div>
      <AdminPageTitle title='Create Employee' />
      <AdminCreateEmployeeForm />
    </div>
  )
}
