import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminDoctorsTable } from "@/app/dashboard/(helpers)/_components/doctors/table"
import { SearchParams } from "@/types"
import { LinkBtn } from "@/components/common/link-btn"
import { Plus } from "lucide-react"

import { paginateDoctors } from "@/app/dashboard/(helpers)/_actions/doctors"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { redirect } from "next/navigation"
import { hasAccessTo } from "../../(helpers)/_actions/access"

export default async function Doctors({ searchParams }: { searchParams: SearchParams }) {
  const doctors = await paginateDoctors(searchParams)

  const hasAccessToViewPromise = hasAccessTo("doctors", "view-doctors")
  const hasAccessToCreatePromise = hasAccessTo("doctors", "create-doctor")
  const hasAccessToUpdatePromise = hasAccessTo("doctors", "update-doctor")
  const hasAccessToDeletePromise = hasAccessTo("doctors", "delete-doctor")

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
      <AdminPageTitle title='Doctors'>
        {hasAccessToCreate && (
          <LinkBtn icon={Plus} variant='outline' href={employeesRoutes.doctors.create}>
            Create
          </LinkBtn>
        )}
      </AdminPageTitle>

      <AdminDoctorsTable
        searchParams={searchParams}
        data={doctors.doctors}
        hasNextPage={doctors.hasNextPage}
        hasUpdateAccess={hasAccessToUpdate}
        hasDeleteAccess={hasAccessToDelete}
      />
    </div>
  )
}
