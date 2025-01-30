"use client"

import React, { useContext } from "react"

import { useAppSelector } from "@/store"
import { cn } from "@/lib/utils"

import { AdminSidebarHeader } from "./header"
import { AdminSidebarItem } from "./item"

import { EmployeePermissionsContext } from "../../../_providers/permissions-provider"
import { resourcesIcons } from "@/lib/constants"

export const AdminSidebar = () => {
  const sidebarState = useAppSelector((state) => state.adminSidebar)
  const permissions = useContext(EmployeePermissionsContext)

  return (
    <aside
      className={cn(
        "bg-[#111] h-screen border-r border-r-[#222] p-2 w-80 overflow-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thin hidden xl:flex xl:justify-between xl:flex-col md:block",
        sidebarState && "w-20 overflow-hidden"
      )}
    >
      <div className='flex flex-col justify-between h-full'>
        <section>
          <AdminSidebarHeader />

          <div className='mt-4'>
            <p className='font-semibold text-xs uppercase text-gray-400 px-4 mb-2'>Application</p>
            <AdminSidebarItem label={"Dashboard"} url={"/dashboard"} icon={resourcesIcons.logs} />
            {permissions.map((group) => (
              <AdminSidebarItem
                key={group.id}
                label={group.groupName}
                url={group.groupUrl}
                icon={resourcesIcons[group.groupIcon as keyof typeof resourcesIcons]}
              />
            ))}
          </div>

          <div className='mt-4'>
            <p className='font-semibold text-xs uppercase text-gray-500 px-4 mb-2'>Settings</p>
            <AdminSidebarItem
              label={"Settings"}
              url={"/dashboard/settings"}
              icon={resourcesIcons.permissions}
            />
            <AdminSidebarItem
              label={"Profile"}
              url={"/dashboard/profile"}
              icon={resourcesIcons.logs}
            />
          </div>
        </section>
      </div>
    </aside>
  )
}
