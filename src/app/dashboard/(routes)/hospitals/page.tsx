import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"
import FilterAll from "@/app/dashboard/(helpers)/_components/common/filter"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SearchParams } from "@/types"
import { DefaultTableFooter } from "@/app/dashboard/(helpers)/_components/common/table-footer"
import { paginateHospitals } from "@/app/dashboard/(helpers)/_actions/hospitals"
import { HospitalActionsDropdown } from "@/app/dashboard/(helpers)/_components/hospitals/hospital-actions-dropdown"
import { EmptyState } from "@/components/common/empty-state"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { diffForHuman } from "@/lib/utils"
import { OrderBy } from "@/lib/order-by"

export default async function Hospitals({ searchParams }: { searchParams: SearchParams }) {
  const hospitals = await paginateHospitals(searchParams)

  return (
    <div>
      <AdminPageTitle title='Hospitals'>
        <Button icon={Plus} variant='outline'>
          Create
        </Button>
      </AdminPageTitle>

      <FilterAll searchParams={searchParams} orderByArray={OrderBy.hospitals} parentClassName='mb-4' />
      {hospitals.hospitals.length === 0 && <EmptyState />}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>ID</TableHead>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Last Update</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hospitals.hospitals.map((hospital) => (
            <TableRow key={`hospital-row-${hospital.id}`}>
              <TableCell className='font-medium'>{hospital.id}</TableCell>
              <TableCell>
                <div>
                  <img className='rounded-md object-cover' src={hospital.logo} width={40} height={40} alt='Hospital Logo' />
                </div>
              </TableCell>
              <TableCell>{hospital.name}</TableCell>
              <TableCell>{hospital.location}</TableCell>
              <TableCell>{diffForHuman(hospital.updatedAt)}</TableCell>
              <TableCell className='text-right space-x-2'>
                <HospitalActionsDropdown hospital={hospital} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DefaultTableFooter searchParams={searchParams} hasNextPage={!hospitals.hasNextPage} />
    </div>
  )
}
