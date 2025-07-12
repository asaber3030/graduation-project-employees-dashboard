import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminPrescriptionsTable } from "@/app/dashboard/(helpers)/_components/prescriptions/table"
import { SearchParams } from "@/types"
import { LinkBtn } from "@/components/common/link-btn"
import { Plus } from "lucide-react"

import { paginatePrescriptions } from "@/app/dashboard/(helpers)/_actions/prescriptions"
import { showHospitalName } from "@/lib/utils"
import { adminRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { getHospital } from "@/actions/app"
import { notFound } from "next/navigation"

type Props = {
  searchParams: SearchParams
  params: { hospitalId: string }
}

export default async function HospitalIdPrescriptions({ searchParams, params }: Props) {
  const hospitalId = +params.hospitalId
  const hospital = await getHospital({ id: hospitalId })
  const prescriptions = await paginatePrescriptions(searchParams, undefined, hospitalId)

  if (!hospital) return notFound()

  const pageTitle = (
    <span>
      Hosptial <b>{showHospitalName(hospital)}</b> - Prescriptions
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
        <LinkBtn icon={Plus} variant='outline' href={adminRoutes.prescriptions.create}>
          Create
        </LinkBtn>
      </AdminPageTitle>

      <AdminPrescriptionsTable
        data={prescriptions.prescriptions}
        hasNextPage={prescriptions.hasNextPage}
        searchParams={searchParams}
      />
    </div>
  )
}
