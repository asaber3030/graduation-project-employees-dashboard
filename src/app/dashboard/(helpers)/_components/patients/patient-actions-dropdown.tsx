"use client"

import { Patient } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Cog, Eye, MoreHorizontal, NotepadTextDashed, Pill, Syringe, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation"
import { employeesRoutes } from "../../_utils/routes"

type Props = {
  patient: Patient
  hasAccessToUpdate: boolean
  hasAccessToDelete: boolean
}

export const PatientActionsDropdown = ({
  patient,
  hasAccessToDelete,
  hasAccessToUpdate
}: Props) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button icon={MoreHorizontal} variant='outline' className='p-0 px-2' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push(employeesRoutes.patients.view(patient.id))}>
          <Eye className='size-4' /> View
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(employeesRoutes.patients.patientPrescriptions(patient.id))}
        >
          <NotepadTextDashed className='size-4' /> Prescriptions
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(employeesRoutes.patients.patientMedications(patient.id))}
        >
          <Pill className='size-4' /> Medications
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(employeesRoutes.patients.patientVaccinations(patient.id))}
        >
          <Syringe className='size-4' /> Vaccinations
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {hasAccessToUpdate && (
          <DropdownMenuItem
            onClick={() => router.push(employeesRoutes.patients.update(patient.id))}
          >
            <Cog className='size-4' /> Update
          </DropdownMenuItem>
        )}

        {hasAccessToDelete && (
          <DropdownMenuItem>
            <Trash className='size-4' /> Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
