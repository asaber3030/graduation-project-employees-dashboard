import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminInventoriesTable } from "@/app/dashboard/(helpers)/_components/inventories/table"
import { SearchParams } from "@/types"
import { Plus } from "lucide-react"
import { LinkBtn } from "@/components/common/link-btn"

import { adminRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { getHospital } from "@/actions/app"
import { notFound } from "next/navigation"
import { showHospitalName } from "@/lib/utils"
import { paginateInventories } from "@/app/dashboard/(helpers)/_actions/inventories"

type Props = {
  searchParams: SearchParams
  params: { hospitalId: string }
}

export default async function HospitalIdInventories({ searchParams, params }: Props) {
  const hospitalId = +params.hospitalId
  const hospital = await getHospital({ id: hospitalId })
  const inventories = await paginateInventories(searchParams, hospitalId)

  if (!hospital) return notFound()

  const pageTitle = (
    <span>
      Hosptial <b>{showHospitalName(hospital)}</b> - Inventories
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
        <LinkBtn icon={Plus} variant='outline' href={adminRoutes.inventories.create}>
          Create
        </LinkBtn>
      </AdminPageTitle>

      <AdminInventoriesTable
        data={inventories.inventories}
        hasNextPage={inventories.hasNextPage}
        searchParams={searchParams}
      />
    </div>
  )
}
