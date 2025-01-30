"use client"

import Link from "next/link"
import React from "react"

import { usePathname } from "next/navigation"
import { useAppSelector } from "@/store"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { resourcesIcons } from "@/lib/constants"
import Image from "next/image"

type Props = {
  label: string
  url: string
  icon: string
  children?: React.ReactNode
  hasItems?: boolean
}

export const AdminSidebarItem = ({ url, label, icon, children, hasItems = true }: Props) => {
  const sidebarActive = useAppSelector((state) => state.adminSidebar)
  const pathname = usePathname()
  const isActive = pathname.endsWith(url)

  return (
    <Link
      href={url}
      className={cn(
        "flex gap-2 group items-center text-sm w-full font-semibold text-gray-200 hover:bg-[#222] hover:text-white rounded-md transition-colors px-3 pr-0 [&:not(:last-of-type)]:mb-0.5 py-1.5",
        isActive && "bg-[#222] text-white",
        sidebarActive && "justify-center text-center px-0 mb-4 py-2"
      )}
    >
      <Image src={icon} alt={label} width={18} height={18} className='invert' />
      {!sidebarActive && label}
    </Link>
  )
}
