import AdminEmployeeWorkInformationCard from "@/app/dashboard/(helpers)/_components/employees/work-information-card"
import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"
import React from "react"
import Link from "next/link"

import db from "@/services/prisma"

import { AdminEmployeeLatestLogsCard } from "@/app/dashboard/(helpers)/_components/employees/latest-logs-card"
import { AdminEmployeeDetailsCard } from "@/app/dashboard/(helpers)/_components/employees/details-card"
import { EmployeeResourceBox } from "@/app/dashboard/(helpers)/_components/employees/resource-box"
import { ATFullEmployee } from "@/app/dashboard/(helpers)/_types"
import { Directions } from "@/app/dashboard/(helpers)/_components/common/breadcrumb-directions"
import { LinkBtn } from "@/components/common/link-btn"
import { Button } from "@/components/ui/button"

import { resourcesIcons } from "@/lib/constants"
import { findEmployee } from "@/app/dashboard/(helpers)/_actions/employees"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { notFound } from "next/navigation"

type Props = {
  params: {
    employeeId: string
  }
}

export default async function EmployeeIdPage({ params }: Props) {
  const employeeId = +params.employeeId
  const employee = await findEmployee({ id: employeeId })
  const countLogs = await db.employeeLog.count({ where: { employeeId } })
  const countPermissions = await db.employeePermission.count({ where: { employeeId } })

  if (!employee) return notFound()

  const logs = await db.employeeLog.findMany({
    where: { employeeId: employee.id },
    orderBy: { createdAt: "desc" },
    take: 5
  })

  const pageTitle = (
    <span>
      Employee <b>{employee.name}</b>
    </span>
  )

  const breadcrumbs = [
    { href: employeesRoutes.employees.root, label: "Employees" },
    {
      href: employeesRoutes.employees.view(employeeId),
      label: `Employee ID: ${employeeId}`,
      disabled: true
    }
  ]

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
        <LinkBtn href={employeesRoutes.employees.update(employee.id)}>Update</LinkBtn>
      </AdminPageTitle>

      <Directions urls={breadcrumbs} />

      <section className='mt-4'>
        <section className='grid grid-cols-1 xl:grid-cols-3 gap-4'>
          <EmployeeResourceBox
            num={countPermissions}
            label='Permissions'
            href={employeesRoutes.employees.employeePermissions(employee.id)}
            image={resourcesIcons.permissions}
          />
          <EmployeeResourceBox
            num={countLogs}
            label='Logs'
            href={employeesRoutes.employees.employeeLogs(employee.id)}
            image={resourcesIcons.logs}
          />
        </section>

        <div className='grid gap-4 md:grid-cols-2 my-4'>
          <AdminEmployeeDetailsCard employee={employee as ATFullEmployee} />
          <AdminEmployeeWorkInformationCard employee={employee as ATFullEmployee} />
        </div>

        <Link
          className='text-xl font-semibold my-4 block w-fit hover:underline'
          href={employeesRoutes.employees.employeeLogs(employeeId)}
        >
          Latest Logs
        </Link>

        <AdminEmployeeLatestLogsCard logs={logs} />
        <div className='mt-4 flex justify-end gap-2'>
          <LinkBtn href={employeesRoutes.employees.update(employee.id)} variant='outline'>
            Edit Employee
          </LinkBtn>
          <Button>Download Report</Button>
        </div>
      </section>
    </div>
  )
}
