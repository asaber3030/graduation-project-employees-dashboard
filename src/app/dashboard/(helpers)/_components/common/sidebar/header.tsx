"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AdminSidebarHeaderDropdown } from "./header-dropdown"

import { userImagePlaceholder } from "@/lib/constants"
import { useAdmin } from "../../../_hooks/useAdmin"

export const AdminSidebarHeader = () => {
  const admin = useAdmin()

  return (
    <div className='p-4 shadow-sm rounded-md border border-[#222] bg-[#222]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Avatar>
            <AvatarImage src={userImagePlaceholder} alt={admin.name} />
            <AvatarFallback>{admin.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className='font-medium text-gray-200'>{admin.name}</span>
            <span className='text-xs text-gray-500'>{admin.email}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
