import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminDepartmentsTable } from "@/app/dashboard/(helpers)/_components/departments/table"
import { SearchParams } from "@/types"
import { Plus } from "lucide-react"
import { LinkBtn } from "@/components/common/link-btn"

import { adminRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { getHospital } from "@/actions/app"
import { notFound } from "next/navigation"
import { showHospitalName } from "@/lib/utils"
import { paginateDepartments } from "@/app/dashboard/(helpers)/_actions/departments"

type Props = {
  searchParams: SearchParams
  params: { hospitalId: string }
}

export default async function HospitalIdDepartments({ searchParams, params }: Props) {
  const hospitalId = +params.hospitalId
  const hospital = await getHospital({ id: hospitalId })
  const departments = await paginateDepartments(searchParams, hospitalId)

  if (!hospital) return notFound()

  const pageTitle = (
    <span>
      Hosptial <b>{showHospitalName(hospital)}</b> - Departments
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
        <LinkBtn icon={Plus} variant='outline' href={adminRoutes.departments.create}>
          Create
        </LinkBtn>
      </AdminPageTitle>

      <AdminDepartmentsTable
        data={departments.departments}
        hasNextPage={departments.hasNextPage}
        searchParams={searchParams}
      />
    </div>
  )
}
