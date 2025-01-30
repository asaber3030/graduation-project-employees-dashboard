"use client"

import { Doctor } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation"
import { employeesRoutes } from "../../_utils/routes"

type Props = {
  doctor: Doctor
}

export const AdminDoctorActionsDropdown = ({ doctor }: Props) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button icon={MoreHorizontal} variant='outline' className='p-0 px-2' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push(employeesRoutes.doctors.view(doctor.id))}>
          <Eye className='size-4' /> View
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className='size-4' /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
