import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminEmployeesTable } from "@/app/dashboard/(helpers)/_components/employees/table"
import { SearchParams } from "@/types"
import { LinkBtn } from "@/components/common/link-btn"
import { Plus } from "lucide-react"

import { paginateEmployees } from "@/app/dashboard/(helpers)/_actions/employees"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { hasAccessTo } from "../../(helpers)/_actions/access"
import { redirect } from "next/navigation"

export default async function Employees({ searchParams }: { searchParams: SearchParams }) {
  const employees = await paginateEmployees(searchParams)

  const hasAccessToViewPromise = hasAccessTo("employees", "view-employees")
  const hasAccessToCreatePromise = hasAccessTo("employees", "create-employee")
  const hasAccessToUpdatePromise = hasAccessTo("employees", "update-employee")
  const hasAccessToDeletePromise = hasAccessTo("employees", "delete-employee")

  const [hasAccessToView, hasAccessToCreate, hasAccessToUpdate, hasAccessToDelete] =
    await Promise.all([
      hasAccessToViewPromise,
      hasAccessToCreatePromise,
      hasAccessToUpdatePromise,
      hasAccessToDeletePromise
    ])

  if (!hasAccessToView) return redirect(employeesRoutes.dashboard.root)

  return (
    <div>
      <AdminPageTitle title='Employees'>
        {hasAccessToCreate && (
          <LinkBtn icon={Plus} variant='outline' href={employeesRoutes.employees.create}>
            Create
          </LinkBtn>
        )}
      </AdminPageTitle>

      <AdminEmployeesTable
        data={employees.employees}
        hasNextPage={employees.hasNextPage}
        searchParams={searchParams}
        hasAccessToUpdate={hasAccessToUpdate}
        hasAccessToDelete={hasAccessToDelete}
      />
    </div>
  )
}
