import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"
import React from "react"

import { AdminUpdateEmployeeForm } from "@/app/dashboard/(helpers)/_components/employees/update-form"
import { ATFullEmployee } from "@/app/dashboard/(helpers)/_types"
import { Directions } from "@/app/dashboard/(helpers)/_components/common/breadcrumb-directions"

import { findEmployee } from "@/app/dashboard/(helpers)/_actions/employees"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { notFound, redirect } from "next/navigation"
import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"

type Props = {
  params: {
    employeeId: string
  }
}

export default async function UpdateEmployeePage({ params }: Props) {
  const employeeId = +params.employeeId
  const employee = await findEmployee({ id: employeeId })

  if (!employee) return notFound()

  const hasAccessToUpdatePromise = hasAccessTo("employees", "update-employee")
  const [handleAccessToUpdate] = await Promise.all([hasAccessToUpdatePromise])
  if (!handleAccessToUpdate) return redirect(employeesRoutes.dashboard.root)

  const pageTitle = (
    <span>
      Update Employee - <b>@{employee.name}</b>
    </span>
  )

  const breadcrumbs = [
    { href: employeesRoutes.employees.root, label: "Employees" },
    {
      href: employeesRoutes.employees.view(employeeId),
      label: `Employee ID: ${employeeId}`,
      isBold: true
    },
    {
      href: employeesRoutes.employees.update(employeeId),
      label: `Update`,
      disabled: true
    }
  ]

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <Directions urls={breadcrumbs} />
      <AdminUpdateEmployeeForm employee={employee as ATFullEmployee} />
    </div>
  )
}
