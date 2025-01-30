import FilterAll from "@/app/dashboard/(helpers)/_components/common/filter"

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

import Link from "next/link"

import { OrderBy } from "../../_utils/order-by"
import { ATFullPatientMedication } from "../../_types"
import { LinkBtn } from "@/components/common/link-btn"
import { Eye } from "lucide-react"

type Props = {
  data: ATFullPatientMedication[]
  hasNextPage: boolean
  searchParams: SearchParams
  showFilters?: boolean
}

export const AdminPatientMedicationsTable = ({
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
                <TableHead>Dosage</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Medicine</TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((medication) => (
                <TableRow key={`doctor-row-${medication.id}`}>
                  <TableCell className='font-medium'>{medication.id}</TableCell>

                  <TableCell className='font-medium'>{medication.dosage}</TableCell>

                  <TableCell>{diffForHuman(medication.startDate)}</TableCell>

                  <TableCell>{diffForHuman(medication.endDate)}</TableCell>

                  <TableCell>
                    <Link
                      className='text-blue-500'
                      href={employeesRoutes.patients.view(medication.patient.id)}
                    >
                      {medication.patient.name}
                    </Link>
                  </TableCell>

                  <TableCell>
                    <Link
                      className='text-blue-500'
                      href={employeesRoutes.medicine.view(medication.medicine.id)}
                    >
                      {medication.medicine.enName}
                    </Link>
                  </TableCell>

                  <TableCell className='text-right space-x-2'>
                    <LinkBtn
                      icon={Eye}
                      href={employeesRoutes.medicine.view(medication.id)}
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
