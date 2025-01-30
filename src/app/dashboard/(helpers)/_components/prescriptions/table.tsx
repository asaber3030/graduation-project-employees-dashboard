import FilterAll from "@/app/dashboard/(helpers)/_components/common/filter"

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

import { diffForHuman } from "@/lib/utils"
import { OrderBy } from "../../_utils/order-by"
import { ATFullPrescritpion } from "../../_types"
import Link from "next/link"
import { employeesRoutes } from "../../_utils/routes"
import { LinkBtn } from "@/components/common/link-btn"
import { Cog, Eye } from "lucide-react"

type Props = {
  data: ATFullPrescritpion[]
  hasNextPage: boolean
  searchParams: SearchParams
  showFilters?: boolean
  hasAccessToUpdate?: boolean
  hasAccessToDelete?: boolean
}

export const AdminPrescriptionsTable = ({
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
          orderByArray={OrderBy.prescriptions}
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
                <TableHead>Doctor</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((prescription) => (
                <TableRow key={`doctor-row-${prescription.id}`}>
                  <TableCell className='font-medium'>{prescription.id}</TableCell>
                  <TableCell>
                    <Link
                      className='text-blue-500'
                      href={employeesRoutes.doctors.view(prescription.doctor.id)}
                    >
                      @{prescription.doctor.username}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className='text-blue-500'
                      href={employeesRoutes.doctors.view(prescription.patient.id)}
                    >
                      {prescription.patient.name}
                    </Link>
                  </TableCell>
                  <TableCell>{prescription._count.items} prescription items</TableCell>
                  <TableCell>{diffForHuman(prescription.createdAt)}</TableCell>
                  <TableCell>{diffForHuman(prescription.updatedAt)}</TableCell>
                  <TableCell className='text-right space-x-2'>
                    <LinkBtn
                      icon={Eye}
                      href={employeesRoutes.prescriptions.view(prescription.id)}
                      variant='outline'
                    >
                      View
                    </LinkBtn>
                    {hasAccessToUpdate && (
                      <LinkBtn
                        icon={Cog}
                        href={employeesRoutes.prescriptions.update(prescription.id)}
                        variant='blue'
                      >
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
