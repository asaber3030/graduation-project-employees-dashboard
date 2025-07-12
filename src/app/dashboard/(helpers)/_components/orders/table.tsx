import FilterAll from "@/app/dashboard/(helpers)/_components/common/filter"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FullOrder, SearchParams } from "@/types"
import { DefaultTableFooter } from "@/app/dashboard/(helpers)/_components/common/table-footer"
import { EmptyState } from "@/components/common/empty-state"
import { LinkBtn } from "@/components/common/link-btn"
import { Edit, Eye } from "lucide-react"

import { diffForHuman } from "@/lib/utils"
import { employeesRoutes } from "../../_utils/routes"

type Props = {
  data: FullOrder[]
  searchParams: SearchParams
  hasNextPage: boolean
  showFilters?: boolean
}

export const AdminOrdersTable = ({ showFilters = true, hasNextPage, searchParams, data }: Props) => {
  return (
    <>
      {showFilters && <FilterAll showOrderType={false} showLimit={false} showOrderBy={false} orderByArray={[]} searchParams={searchParams} parentClassName='mb-4' />}
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total Items</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Order Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ordered At</TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((order) => (
                <TableRow key={`inventory-row-${order.id}`}>
                  <TableCell className='font-medium'>{order.id}</TableCell>
                  <TableCell>{order.patient.name}</TableCell>
                  <TableCell>{order.patient.email}</TableCell>
                  <TableCell>{order.items.length} items</TableCell>
                  <TableCell>{order.totalAmount} EGP</TableCell>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell className='captalize'>{order.status}</TableCell>
                  <TableCell>{diffForHuman(order.createdAt)}</TableCell>
                  <TableCell className='text-right space-x-2'>
                    <LinkBtn href={employeesRoutes.orders.view(order.id)} icon={Eye} />
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
