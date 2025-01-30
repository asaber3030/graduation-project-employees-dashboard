import FilterAll from "@/app/dashboard/(helpers)/_components/common/filter"

import { SearchParams } from "@/types"
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

import { DeleteModal } from "../common/delete-modal"
import { Button } from "@/components/ui/button"
import { Cog, Trash } from "lucide-react"
import { Admin } from "@prisma/client"
import { AdminUpdateAdminModal } from "./update-modal"

import { deleteAdminAction } from "../../_actions/admin"
import { diffForHuman } from "@/lib/utils"

type Props = {
  data: Admin[]
  searchParams: SearchParams
  hasNextPage: boolean
  showFilters?: boolean
  hasAccessToUpdate?: boolean
  hasAccessToDelete?: boolean
}

export const AdminAdminsTable = ({
  showFilters = true,
  hasNextPage,
  searchParams,
  data,
  hasAccessToUpdate,
  hasAccessToDelete
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
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((admin) => (
                <TableRow key={`admin-row-${admin.id}`}>
                  <TableCell className='font-medium'>{admin.id}</TableCell>

                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.phoneNumber}</TableCell>
                  <TableCell>{diffForHuman(admin.updatedAt)}</TableCell>

                  <TableCell className='text-right space-x-2'>
                    {hasAccessToUpdate && (
                      <AdminUpdateAdminModal admin={admin}>
                        <Button icon={Cog} variant='blue'>
                          Update
                        </Button>
                      </AdminUpdateAdminModal>
                    )}

                    {hasAccessToDelete && (
                      <DeleteModal deletedId={admin.id} forceAction={deleteAdminAction}>
                        <Button icon={Trash} variant='destructive'>
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
