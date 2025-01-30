"use client"

import { useRouter } from "next/navigation"

import { ATFullDepartment } from "../../_types"
import { Button } from "@/components/ui/button"
import { BoxIcon, BriefcaseMedical, MoreHorizontal, Pickaxe } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { employeesRoutes } from "../../_utils/routes"

type Props = {
  department: ATFullDepartment
}
export const AdminDepartmentActionsDropdown = ({ department }: Props) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button icon={MoreHorizontal} variant='outline' className='p-0 px-2' />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            router.push(employeesRoutes.departments.departmentInventories(department.id))
          }
        >
          <BoxIcon className='size-4' /> Inventories
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push(employeesRoutes.departments.departmentDoctors(department.id))}
        >
          <BriefcaseMedical className='size-4' /> Doctors
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            router.push(employeesRoutes.departments.departmentEmployees(department.id))
          }
        >
          <Pickaxe className='size-4' /> Employees
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
