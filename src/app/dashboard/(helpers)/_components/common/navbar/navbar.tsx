"use client"

import { cn } from "@/lib/utils"
import { employeesRoutes } from "../../../_utils/routes"

import { useAppSelector } from "@/store"

import { AdminNavbarUserDropdown } from "./user-dropdown"
import { AdminNavbarNotificationDropdown } from "./notifications-dropdown"
import { AdminNavbarCreateDropdown } from "./create-dropdown"
import { AdminNavbarSettingsDropdown } from "./settings-dropdown"

import Link from "next/link"

export const AdminNavbar = () => {
  const sidebarActive = useAppSelector((state) => state.adminSidebar)

  return (
    <div
      className={cn(
        "print:hidden w-full bg-[#111] shadow-sm p-4 flex justify-between items-center",
        !sidebarActive && "pr-10",
        sidebarActive && "pr-10"
      )}
    >
      <Link
        className='text-lg font-bold first-letter:text-primary text-white'
        href={employeesRoutes.dashboard.root}
      >
        Techmed
      </Link>

      <div className='flex gap-6'>
        <AdminNavbarUserDropdown />
      </div>
    </div>
  )
}
