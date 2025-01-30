import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminMedicineTable } from "@/app/dashboard/(helpers)/_components/medicine/table"
import { ATFullMedicine } from "@/app/dashboard/(helpers)/_types"
import { SearchParams } from "@/types"
import { LinkBtn } from "@/components/common/link-btn"
import { Plus } from "lucide-react"

import { paginateMedicine } from "@/app/dashboard/(helpers)/_actions/medicine"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { hasAccessTo } from "../../(helpers)/_actions/access"
import { redirect } from "next/navigation"

export default async function InventoriesPage({ searchParams }: { searchParams: SearchParams }) {
  const medicine = await paginateMedicine(searchParams)

  const hasAccessToViewPromise = hasAccessTo("medicine", "view-medicine")
  const hasAccessToCreatePromise = hasAccessTo("medicine", "create-medicine")
  const hasAccessToUpdatePromise = hasAccessTo("medicine", "update-medicine")
  const hasAccessToDeletePromise = hasAccessTo("medicine", "delete-medicine")

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
      <AdminPageTitle title='Medicine'>
        {hasAccessToCreate && (
          <LinkBtn icon={Plus} variant='outline' href={employeesRoutes.medicine.create}>
            Create
          </LinkBtn>
        )}
      </AdminPageTitle>

      <AdminMedicineTable
        data={medicine.medicine as ATFullMedicine[]}
        hasNextPage={medicine.hasNextPage}
        searchParams={searchParams}
        hasAccessToUpdate={hasAccessToUpdate}
        hasAccessToDelete={hasAccessToDelete}
      />
    </div>
  )
}
