import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminAdminsTable } from "@/app/dashboard/(helpers)/_components/admins/table"
import { SearchParams } from "@/types"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { paginateAdmins } from "@/app/dashboard/(helpers)/_actions/admin"
import { AdminCreateAdminModal } from "@/app/dashboard/(helpers)/_components/admins/create-modal"
import { hasAccessTo } from "../../(helpers)/_actions/access"
import { redirect } from "next/navigation"
import { employeesRoutes } from "../../(helpers)/_utils/routes"

export default async function AdminsPage({ searchParams }: { searchParams: SearchParams }) {
  const admins = await paginateAdmins(searchParams)
  const hasAccessToViewPromise = hasAccessTo("admins", "view-admins")
  const hasAccessToCreatePromise = hasAccessTo("admins", "create-admin")
  const hasAccessToUpdatePromise = hasAccessTo("admins", "update-admin")
  const hasAccessToDeletePromise = hasAccessTo("admins", "delete-admin")

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
      <AdminPageTitle title='Admins'>
        {hasAccessToCreate && (
          <AdminCreateAdminModal>
            <Button icon={Plus} variant='outline'>
              Create
            </Button>
          </AdminCreateAdminModal>
        )}
      </AdminPageTitle>

      <AdminAdminsTable
        data={admins.admins}
        searchParams={searchParams}
        hasNextPage={admins.hasNextPage}
        hasAccessToUpdate={hasAccessToUpdate}
        hasAccessToDelete={hasAccessToDelete}
      />
    </div>
  )
}
