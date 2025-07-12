import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"
import FilterAll from "@/app/dashboard/(helpers)/_components/common/filter"
import Image from "next/image"
import Link from "next/link"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PatientActionsDropdown } from "@/app/dashboard/(helpers)/_components/patients/patient-actions-dropdown"
import { DefaultTableFooter } from "@/app/dashboard/(helpers)/_components/common/table-footer"
import { SearchParams } from "@/types"
import { EmptyState } from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { diffForHuman, formatDate } from "@/lib/utils"
import { userImagePlaceholder } from "@/lib/constants"
import { paginatePatients } from "@/app/dashboard/(helpers)/_actions/patients"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { hasAccessTo } from "../../(helpers)/_actions/access"
import { redirect } from "next/navigation"

export default async function Patients({ searchParams }: { searchParams: SearchParams }) {
  const patients = await paginatePatients(searchParams)

  const hasAccessToViewPromise = hasAccessTo("patients", "view-patients")
  const hasAccessToCreatePromise = hasAccessTo("patients", "create-patinet")
  const hasAccessToUpdatePromise = hasAccessTo("patients", "update-patinet")
  const hasAccessToDeletePromise = hasAccessTo("patients", "delete-patinet")

  const [hasAccessToView, hasAccessToCreate, hasAccessToUpdate, hasAccessToDelete] = await Promise.all([hasAccessToViewPromise, hasAccessToCreatePromise, hasAccessToUpdatePromise, hasAccessToDeletePromise])

  if (!hasAccessToView) return redirect(employeesRoutes.dashboard.root)

  return (
    <div>
      <AdminPageTitle title='Patients'>
        {hasAccessToCreate && (
          <Link href={employeesRoutes.patients.create}>
            <Button icon={Plus} variant='outline'>
              Create
            </Button>
          </Link>
        )}
      </AdminPageTitle>

      <FilterAll searchParams={searchParams} orderByArray={[{ label: "Name", name: "name" }]} parentClassName='mb-4' />

      {patients.patients.length === 0 ? (
        <EmptyState />
      ) : (
        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Birth date</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.patients.map((patient) => (
                <TableRow key={`doctor-row-${patient.id}`}>
                  <TableCell className='font-medium'>{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.birthDate ? formatDate(patient.birthDate, "l") : "N/A"}</TableCell>
                  <TableCell>
                    <Image src={userImagePlaceholder} width={40} height={40} alt='doctor Logo' />
                  </TableCell>
                  <TableCell>{diffForHuman(patient.updatedAt)}</TableCell>
                  <TableCell className='text-right space-x-2'>
                    <PatientActionsDropdown hasAccessToUpdate={hasAccessToUpdate} hasAccessToDelete={hasAccessToDelete} patient={patient} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DefaultTableFooter searchParams={searchParams} hasNextPage={!patients.hasNextPage} />
        </section>
      )}
    </div>
  )
}
