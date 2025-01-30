"use client"

import { Hospital } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Box,
  Cog,
  LayoutPanelTop,
  MoreHorizontal,
  NotepadTextDashed,
  Pickaxe,
  Trash,
  Users
} from "lucide-react"
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
  hospital: Hospital
}

export const HospitalActionsDropdown = ({ hospital }: Props) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button icon={MoreHorizontal} variant='outline' className='p-0 px-2' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => router.push(employeesRoutes.hospitals.employees(hospital.id))}
        >
          <Pickaxe className='size-4' /> Employees
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(employeesRoutes.hospitals.inventories(hospital.id))}
        >
          <Box className='size-4' /> Inventories
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(employeesRoutes.hospitals.departments(hospital.id))}
        >
          <LayoutPanelTop className='size-4' /> Departments
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push(employeesRoutes.hospitals.prescriptions(hospital.id))}
        >
          <NotepadTextDashed className='size-4' /> Prescriptions
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push(employeesRoutes.hospitals.update(hospital.id))}
        >
          <Cog className='size-4' /> Update
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
