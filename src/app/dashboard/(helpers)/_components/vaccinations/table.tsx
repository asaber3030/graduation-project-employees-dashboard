import FilterAll from "@/app/dashboard/(helpers)/_components/common/filter"
import Link from "next/link"

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

import { OrderBy } from "../../_utils/order-by"
import { ATFullPatientVaccination } from "../../_types"
import { LinkBtn } from "@/components/common/link-btn"
import { Eye } from "lucide-react"

type Props = {
  data: ATFullPatientVaccination[]
  hasNextPage: boolean
  searchParams: SearchParams
  showFilters?: boolean
}

export const AdminPatientVaccinationsTable = ({
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
          orderByArray={OrderBy.patientMedications}
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
                <TableHead>Vaccine</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((vaccine) => (
                <TableRow key={`doctor-row-${vaccine.id}`}>
                  <TableCell className='font-medium'>{vaccine.id}</TableCell>
                  <TableCell className='font-medium'>{vaccine.vaccineName}</TableCell>
                  <TableCell>{diffForHuman(vaccine.vaccineDate)}</TableCell>
                  <TableCell>
                    <Link
                      className='text-blue-500'
                      href={employeesRoutes.patients.view(vaccine.patient.id)}
                    >
                      {vaccine.patient.name}
                    </Link>
                  </TableCell>
                  <TableCell className='text-right space-x-2'>
                    <LinkBtn
                      icon={Eye}
                      href={employeesRoutes.medicine.view(vaccine.id)}
                      variant='outline'
                    >
                      View
                    </LinkBtn>
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
