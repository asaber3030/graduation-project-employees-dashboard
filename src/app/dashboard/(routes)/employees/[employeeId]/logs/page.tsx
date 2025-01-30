import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import db from "@/services/prisma"

import { AdminEmployeeLatestLogsCard } from "@/app/dashboard/(helpers)/_components/employees/latest-logs-card"
import { Directions } from "@/app/dashboard/(helpers)/_components/common/breadcrumb-directions"
import { LinkBtn } from "@/components/common/link-btn"
import { GoBack } from "@/app/dashboard/(helpers)/_components/common/go-back-button"

import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"

type Props = {
  params: {
    employeeId: string
  }
}

export default async function EmployeeIdLogs({ params }: Props) {
  const employeeId = +params.employeeId
  const logs = await db.employeeLog.findMany({
    where: { employeeId: employeeId },
    orderBy: { createdAt: "desc" }
  })

  const pageTitle = <span>Logs for Employee ID: {employeeId}</span>

  const breadcrumbs = [
    { href: employeesRoutes.employees.root, label: "Employees" },
    {
      href: employeesRoutes.employees.view(employeeId),
      label: `Employee ID: ${employeeId}`,
      isBold: true
    },
    { href: employeesRoutes.employees.employeeLogs(employeeId), label: `Logs`, disabled: true }
  ]

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
        <GoBack />
        <LinkBtn href={employeesRoutes.employees.view(employeeId)}>View Employee</LinkBtn>
      </AdminPageTitle>

      <Directions urls={breadcrumbs} />
      <div className='mt-4'>
        <AdminEmployeeLatestLogsCard logs={logs} />
      </div>
    </div>
  )
}
