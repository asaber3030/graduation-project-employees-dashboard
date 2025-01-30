import { ATFullEmployeePermission } from "../../_types"

import FilterAll from "@/app/dashboard/(helpers)/_components/common/filter"

import { employeesRoutes } from "../../_utils/routes"

import { SearchParams } from "@/types"
import { DefaultTableFooter } from "@/app/dashboard/(helpers)/_components/common/table-footer"
import { EmptyState } from "@/components/common/empty-state"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import Link from "next/link"

import { OrderBy } from "../../_utils/order-by"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DeleteModal } from "../common/delete-modal"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { deleteEmployeePermissionAction } from "../../_actions/permissions"

type Props = {
  data: ATFullEmployeePermission[]
  hasNextPage: boolean
  searchParams: SearchParams
  showFilters?: boolean
}

export const AdminPermissionEmployees = ({
  showFilters = true,
  hasNextPage,
  searchParams,
  data
}: Props) => {
  return (
    <>
      {showFilters && (
        <FilterAll
          searchParams={searchParams}
          orderByArray={OrderBy.permissionEmployees}
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
                <TableHead>Permission Name</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((permissionItem) => (
                <TableRow key={`doctor-row-${permissionItem.id}`}>
                  <TableCell className='font-medium'>{permissionItem.id}</TableCell>
                  <TableCell>
                    <Link
                      className='flex items-center gap-2 hover:underline hover:text-blue-500'
                      href={employeesRoutes.permissions.viewPermission(
                        permissionItem.permission.groupId,
                        permissionItem.permissionId
                      )}
                    >
                      {permissionItem.permission.permissionName}{" "}
                      <span className='text-gray-500'>
                        {permissionItem.permission.permissionCode}
                      </span>
                    </Link>
                  </TableCell>

                  <TableCell>
                    <Link
                      className='flex items-center gap-2 p-2 rounded-md hover:bg-white hover:shadow-sm w-fit'
                      href={employeesRoutes.employees.view(permissionItem.employeeId)}
                    >
                      <Avatar>
                        <AvatarImage src={"/defaults/icons/user-svg.svg"} />
                      </Avatar>
                      <div>
                        <p>
                          {permissionItem.employee.name} #{permissionItem.employee.id}
                        </p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <DeleteModal
                      deletedId={permissionItem.id}
                      forceAction={deleteEmployeePermissionAction}
                    >
                      <Button icon={Trash} variant='warning'>
                        Delete Permission
                      </Button>
                    </DeleteModal>
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
