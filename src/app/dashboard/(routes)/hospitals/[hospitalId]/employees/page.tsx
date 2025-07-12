import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminEmployeesTable } from "@/app/dashboard/(helpers)/_components/employees/table"
import { SearchParams } from "@/types"
import { Plus } from "lucide-react"
import { LinkBtn } from "@/components/common/link-btn"

import { showHospitalName } from "@/lib/utils"
import { paginateEmployees } from "@/app/dashboard/(helpers)/_actions/employees"
import { adminRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { getHospital } from "@/actions/app"
import { notFound } from "next/navigation"

type Props = {
  searchParams: SearchParams
  params: { hospitalId: string }
}

export default async function HospitalIdEmployees({ searchParams, params }: Props) {
  const hospitalId = +params.hospitalId
  const hospital = await getHospital({ id: hospitalId })
  const employees = await paginateEmployees(searchParams, hospitalId)

  if (!hospital) return notFound()

  const pageTitle = (
    <span>
      Hosptial <b>{showHospitalName(hospital)}</b> - Employees
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
        <LinkBtn icon={Plus} variant='outline' href={adminRoutes.employees.create}>
          Create
        </LinkBtn>
      </AdminPageTitle>

      <AdminEmployeesTable
        data={employees.employees}
        hasNextPage={employees.hasNextPage}
        searchParams={searchParams}
      />
    </div>
  )
}
