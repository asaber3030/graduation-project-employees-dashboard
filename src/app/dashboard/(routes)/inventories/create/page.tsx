import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"
import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminCreateInventtoryModal } from "@/app/dashboard/(helpers)/_components/inventories/create-form"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { redirect } from "next/navigation"

export default async function CreateInventoryPage() {
  const hasAccessToCreatePromise = hasAccessTo("inventories", "create-inventory")
  const [hasAccessToCreate] = await Promise.all([hasAccessToCreatePromise])
  if (!hasAccessToCreate) return redirect(employeesRoutes.dashboard.root)

  return (
    <div>
      <AdminPageTitle title='Create Inventory' />
      <AdminCreateInventtoryModal />
    </div>
  )
}
