"use client"

import { logoutAction } from "@/actions/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { userImagePlaceholder } from "@/lib/constants"
import { useMutation } from "@tanstack/react-query"
import { LogOut } from "lucide-react"
import { toast } from "sonner"

export const AdminNavbarUserDropdown = () => {
  const logoutMutation = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => toast.success("Logged out successfully!")
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='size-9'>
          <AvatarImage src={userImagePlaceholder} alt='avatar' />
          <AvatarFallback>G</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Update Password</DropdownMenuItem>
        <DropdownMenuItem>Change Avatar</DropdownMenuItem>
        <DropdownMenuItem>Personal Information</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Admins</DropdownMenuItem>
        <DropdownMenuItem>Hospitals</DropdownMenuItem>
        <DropdownMenuItem>Employees</DropdownMenuItem>
        <DropdownMenuItem>Inventories</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
          <LogOut className='size-4' /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
