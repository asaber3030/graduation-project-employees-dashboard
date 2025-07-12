import Link from "next/link"
import FilterAll from "@/app/dashboard/(helpers)/_components/common/filter"

import { SearchParams } from "@/types"
import { ATFullInventory, FullProduct } from "../../_types"
import { DefaultTableFooter } from "@/app/dashboard/(helpers)/_components/common/table-footer"
import { OrderBy } from "../../_utils/order-by"
import { EmptyState } from "@/components/common/empty-state"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { diffForHuman } from "@/lib/utils"
import { employeesRoutes } from "../../_utils/routes"
import { Edit, Trash } from "lucide-react"
import { DeleteModal } from "../common/delete-modal"
import { Button } from "@/components/ui/button"
import { deleteProductAction } from "../../_actions/products"
import { LinkBtn } from "@/components/common/link-btn"

type Props = {
  data: FullProduct[]
  searchParams: SearchParams
  hasNextPage: boolean
  showFilters?: boolean
  hasAccessToUpdate: boolean
  hasAccessToDelete: boolean
}

export const AdminProductsTable = ({ hasAccessToDelete, hasAccessToUpdate, showFilters = true, hasNextPage, searchParams, data }: Props) => {
  return (
    <>
      {showFilters && <FilterAll searchParams={searchParams} orderByArray={OrderBy.products} parentClassName='mb-4' />}
      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((product) => (
                <TableRow key={`inventory-row-${product.id}`}>
                  <TableCell className='font-medium'>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price} EGP</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>
                    <img src={product.image || "/defaults/logo.png"} alt={product.name} className='w-10 h-10 object-cover rounded' />
                  </TableCell>
                  <TableCell>{diffForHuman(product.updatedAt)}</TableCell>
                  <TableCell className='text-right space-x-2'>
                    {hasAccessToDelete && (
                      <DeleteModal deletedId={product.id} forceAction={deleteProductAction}>
                        <Button variant='destructive' icon={Trash}>
                          Delete
                        </Button>
                      </DeleteModal>
                    )}
                    {hasAccessToUpdate && <LinkBtn href={employeesRoutes.products.update(product.id)} icon={Edit} />}
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
