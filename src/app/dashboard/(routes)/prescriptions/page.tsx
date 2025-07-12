import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminPrescriptionsTable } from "@/app/dashboard/(helpers)/_components/prescriptions/table"
import { SearchParams } from "@/types"
import { LinkBtn } from "@/components/common/link-btn"
import { Plus } from "lucide-react"

import { paginatePrescriptions } from "@/app/dashboard/(helpers)/_actions/prescriptions"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { hasAccessTo } from "../../(helpers)/_actions/access"
import { redirect } from "next/navigation"

export default async function Prescriptions({ searchParams }: { searchParams: SearchParams }) {
  const prescriptions = await paginatePrescriptions(searchParams)

  const hasAccessToViewPromise = hasAccessTo("prescriptions", "view-prescriptions")
  const hasAccessToCreatePromise = hasAccessTo("prescriptions", "create-prescription")
  const hasAccessToUpdatePromise = hasAccessTo("prescriptions", "update-prescription")
  const hasAccessToDeletePromise = hasAccessTo("prescriptions", "delete-prescription")

  const [hasAccessToView, hasAccessToCreate, hasAccessToUpdate, hasAccessToDelete] = await Promise.all([hasAccessToViewPromise, hasAccessToCreatePromise, hasAccessToUpdatePromise, hasAccessToDeletePromise])

  if (!hasAccessToView) return redirect(employeesRoutes.dashboard.root)

  return (
    <div>
      <AdminPageTitle title='Prescriptions'>
        {hasAccessToCreate && (
          <LinkBtn icon={Plus} variant='outline' href={employeesRoutes.prescriptions.create}>
            Create
          </LinkBtn>
        )}
      </AdminPageTitle>

      <AdminPrescriptionsTable data={prescriptions.prescriptions} searchParams={searchParams} hasNextPage={prescriptions.hasNextPage} hasAccessToUpdate={hasAccessToUpdate} hasAccessToDelete={hasAccessToDelete} />
    </div>
  )
}
