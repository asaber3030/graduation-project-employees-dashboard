import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminCreateDepartmentModal } from "@/app/dashboard/(helpers)/_components/departments/create-modal"
import { AdminDepartmentsTable } from "@/app/dashboard/(helpers)/_components/departments/table"
import { SearchParams } from "@/types"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { paginateDepartments } from "@/app/dashboard/(helpers)/_actions/departments"
import { hasAccessTo } from "../../(helpers)/_actions/access"
import { redirect } from "next/navigation"
import { employeesRoutes } from "../../(helpers)/_utils/routes"

export default async function Departments({ searchParams }: { searchParams: SearchParams }) {
  const departments = await paginateDepartments(searchParams)
  const hasAccessToViewPromise = hasAccessTo("departments", "view-departments")
  const hasAccessToCreatePromise = hasAccessTo("departments", "create-department")
  const hasAccessToUpdatePromise = hasAccessTo("departments", "update-department")
  const hasAccessToDeletePromise = hasAccessTo("departments", "delete-department")

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
      <AdminPageTitle title='Departments'>
        {hasAccessToCreate && (
          <AdminCreateDepartmentModal asChild>
            <Button icon={Plus} variant='outline'>
              Create
            </Button>
          </AdminCreateDepartmentModal>
        )}
      </AdminPageTitle>

      <AdminDepartmentsTable
        searchParams={searchParams}
        hasNextPage={departments.hasNextPage}
        data={departments.departments}
        hasAccessToUpdate={hasAccessToUpdate}
        hasAccessToDelete={hasAccessToDelete}
      />
    </div>
  )
}
