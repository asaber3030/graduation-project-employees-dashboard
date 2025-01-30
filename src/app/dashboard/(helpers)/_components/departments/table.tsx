import Link from "next/link"
import FilterAll from "@/app/dashboard/(helpers)/_components/common/filter"

import { SearchParams } from "@/types"
import { ATFullDepartment } from "../../_types"
import { DefaultTableFooter } from "@/app/dashboard/(helpers)/_components/common/table-footer"
import { OrderBy } from "../../_utils/order-by"
import { EmptyState } from "@/components/common/empty-state"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { AdminDepartmentActionsDropdown } from "./actions-dropdown"
import { AdminUpdateDepartmentModal } from "./update-modal"
import { DeleteModal } from "../common/delete-modal"

import { diffForHuman, showHospitalName } from "@/lib/utils"
import { deleteDepartmentAction } from "../../_actions/departments"
import { employeesRoutes } from "../../_utils/routes"

type Props = {
  data: ATFullDepartment[]
  searchParams: SearchParams
  hasNextPage: boolean
  showFilters?: boolean
  hasAccessToUpdate?: boolean
  hasAccessToDelete?: boolean
}

export const AdminDepartmentsTable = ({
  showFilters = true,
  hasNextPage,
  searchParams,
  data,
  hasAccessToDelete,
  hasAccessToUpdate
}: Props) => {
  return (
    <>
      {showFilters && (
        <FilterAll
          searchParams={searchParams}
          orderByArray={OrderBy.departments}
          parentClassName='mb-4'
        />
      )}
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((department) => (
                <TableRow key={`department-row-${department.id}`}>
                  <TableCell className='font-medium'>{department.id}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>
                    <Link
                      className='text-blue-500'
                      href={employeesRoutes.hospitals.view(department.hospital.id)}
                    >
                      {showHospitalName(department.hospital)}
                    </Link>
                  </TableCell>
                  <TableCell>{diffForHuman(department.updatedAt)}</TableCell>
                  <TableCell className='text-right space-x-2'>
                    {hasAccessToUpdate && (
                      <AdminUpdateDepartmentModal department={department} asChild>
                        <Button variant='blue'>Update</Button>
                      </AdminUpdateDepartmentModal>
                    )}
                    {hasAccessToDelete && (
                      <DeleteModal deletedId={department.id} forceAction={deleteDepartmentAction}>
                        <Button variant='destructive'>Delete</Button>
                      </DeleteModal>
                    )}
                    <AdminDepartmentActionsDropdown department={department} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DefaultTableFooter searchParams={searchParams} hasNextPage={!hasNextPage} />
        </section>
      )}
    </>
  )
}
