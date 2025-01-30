import FilterAll from "@/app/dashboard/(helpers)/_components/common/filter"
import Image from "next/image"

import { diffForHuman } from "@/lib/utils"
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

import { ATFullMedicine } from "../../_types"
import { LinkBtn } from "@/components/common/link-btn"

type Props = {
  data: ATFullMedicine[]
  hasNextPage: boolean
  searchParams: SearchParams
  showFilters?: boolean
  hasAccessToUpdate: boolean
  hasAccessToDelete: boolean
}

export const AdminMedicineTable = ({
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
                <TableHead className='w-[200px]'>EN Name</TableHead>
                <TableHead className='w-[200px]'>AR Name</TableHead>
                <TableHead className='w-[200px]'>Image</TableHead>
                <TableHead className='w-[200px]'>Image</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Dosage Form</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((medicine) => (
                <TableRow key={`medicine-row-${medicine.id}`}>
                  <TableCell className='font-medium'>{medicine.id}</TableCell>
                  <TableCell>{medicine.enName}</TableCell>
                  <TableCell>{medicine.arName}</TableCell>
                  <TableCell>
                    <Image width={50} height={50} alt='50' src={medicine.image ?? "/logo.png"} />
                  </TableCell>
                  <TableCell>
                    <Image width={50} height={50} alt='50' src={medicine.barcode ?? "/logo.png"} />
                  </TableCell>
                  <TableCell>{medicine.price}</TableCell>
                  <TableCell>{medicine.dosageForm.name}</TableCell>
                  <TableCell>{diffForHuman(medicine.createdAt)}</TableCell>
                  <TableCell>{diffForHuman(medicine.updatedAt)}</TableCell>
                  <TableCell className='text-right space-x-2'>
                    {hasAccessToUpdate && (
                      <LinkBtn href={employeesRoutes.medicine.update(medicine.id)} variant='blue'>
                        Update
                      </LinkBtn>
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
