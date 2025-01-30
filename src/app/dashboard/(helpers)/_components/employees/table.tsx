import FilterAll from "@/app/dashboard/(helpers)/_components/common/filter"
import Link from "next/link"

import { SearchParams } from "@/types"
import { DefaultTableFooter } from "@/app/dashboard/(helpers)/_components/common/table-footer"
import { EmptyState } from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"
import { ATFullEmployee } from "../../_types"
import { LinkBtn } from "@/components/common/link-btn"
import { DeleteModal } from "../common/delete-modal"
import { Cog, Eye, Trash } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { diffForHuman, showHospitalName } from "@/lib/utils"
import { deleteEmployeeAction } from "../../_actions/employees"
import { employeesRoutes } from "../../_utils/routes"

type Props = {
  data: ATFullEmployee[]
  searchParams: SearchParams
  hasNextPage: boolean
  showFilters?: boolean
  hasAccessToUpdate?: boolean
  hasAccessToDelete?: boolean
}

export const AdminEmployeesTable = ({
  hasNextPage,
  searchParams,
  data,
  hasAccessToDelete,
  hasAccessToUpdate
}: Props) => {
  return (
    <>
      <FilterAll
        searchParams={searchParams}
        orderByArray={[{ label: "Name", name: "name" }]}
        parentClassName='mb-4'
      />
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Hosptial</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((employee) => (
                <TableRow key={`employee-row-${employee.id}`}>
                  <TableCell className='font-medium'>{employee.id}</TableCell>

                  <TableCell>{employee.name}</TableCell>

                  <TableCell>
                    <Link
                      href={employeesRoutes.employees.view(employee.id)}
                      className='text-blue-600'
                    >
                      @{employee.username}
                    </Link>
                  </TableCell>

                  <TableCell>{employee.phoneNumber}</TableCell>

                  <TableCell>
                    <Link
                      href={employeesRoutes.departments.view(employee.departmentId)}
                      className='text-blue-600'
                    >
                      {employee.department.name}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <Link
                      href={employeesRoutes.hospitals.view(employee.hospitalId)}
                      className='text-blue-600'
                    >
                      {showHospitalName(employee.hospital)}
                    </Link>
                  </TableCell>

                  <TableCell>{diffForHuman(employee.updatedAt)}</TableCell>

                  <TableCell className='text-right space-x-2'>
                    <LinkBtn
                      href={employeesRoutes.employees.view(employee.id)}
                      variant='outline'
                      icon={Eye}
                    >
                      View
                    </LinkBtn>

                    {hasAccessToUpdate && (
                      <LinkBtn
                        href={employeesRoutes.employees.update(employee.id)}
                        variant='blue'
                        icon={Cog}
                      >
                        Update
                      </LinkBtn>
                    )}

                    {hasAccessToDelete && (
                      <DeleteModal deletedId={employee.id} forceAction={deleteEmployeeAction}>
                        <Button variant='destructive' icon={Trash}>
                          Delete
                        </Button>
                      </DeleteModal>
                    )}
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
