import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Cog, LogOut, Plus } from "lucide-react"

export const AdminNavbarSettingsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="size-9">
          <Cog />
        </Button>
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
        <DropdownMenuItem>
          <LogOut className="size-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
