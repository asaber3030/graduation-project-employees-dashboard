import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminInventoriesTable } from "@/app/dashboard/(helpers)/_components/inventories/table"
import { SearchParams } from "@/types"
import { Plus } from "lucide-react"

import { paginateInventories } from "@/app/dashboard/(helpers)/_actions/inventories"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { LinkBtn } from "@/components/common/link-btn"
import { hasAccessTo } from "../../(helpers)/_actions/access"
import { redirect } from "next/navigation"

export default async function InventoriesPage({ searchParams }: { searchParams: SearchParams }) {
  const inventories = await paginateInventories(searchParams)

  const hasAccessToViewPromise = hasAccessTo("inventories", "view-inventories")
  const hasAccessToCreatePromise = hasAccessTo("inventories", "create-inventory")
  const hasAccessToUpdatePromise = hasAccessTo("inventories", "update-inventory")
  const hasAccessToDeletePromise = hasAccessTo("inventories", "delete-inventory")

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
      <AdminPageTitle title='Inventories'>
        {hasAccessToCreate && (
          <LinkBtn icon={Plus} variant='outline' href={employeesRoutes.inventories.create}>
            Create
          </LinkBtn>
        )}
      </AdminPageTitle>

      <AdminInventoriesTable
        data={inventories.inventories}
        searchParams={searchParams}
        hasNextPage={true}
        hasAccessToUpdate={hasAccessToUpdate}
        hasAccessToDelete={hasAccessToDelete}
      />
    </div>
  )
}
