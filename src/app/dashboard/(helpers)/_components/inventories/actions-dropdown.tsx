"use client"

import { useRouter } from "next/navigation"

import { BoxIcon, BriefcaseMedical, Cog, MoreHorizontal, Paperclip, Pickaxe } from "lucide-react"
import { ATFullInventory } from "../../_types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { employeesRoutes } from "../../_utils/routes"

type Props = {
  inventory: ATFullInventory
  hasAccessToUpdate?: boolean
}
export const AdminInventoryActionsDropdown = ({ inventory, hasAccessToUpdate }: Props) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button icon={MoreHorizontal} variant='outline' className='p-0 px-2' />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            router.push(employeesRoutes.departments.departmentInventories(inventory.id))
          }
        >
          <BoxIcon className='size-4' /> Inventories
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(employeesRoutes.departments.departmentDoctors(inventory.id))}
        >
          <BriefcaseMedical className='size-4' /> Doctors
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(employeesRoutes.departments.departmentEmployees(inventory.id))}
        >
          <Pickaxe className='size-4' /> Employees
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            router.push(employeesRoutes.departments.departmentExaminationForms(inventory.id))
          }
        >
          <Paperclip className='size-4' /> Examination Forms
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        {hasAccessToUpdate && (
          <DropdownMenuItem
            onClick={() => router.push(employeesRoutes.inventories.update(inventory.id))}
          >
            <Cog className='size-4' /> Update
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
