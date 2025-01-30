import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"
import { employeesRoutes } from "../../_utils/routes"

import Link from "next/link"
import React from "react"

export type DirectionURL = {
  href: string
  label: string | React.ReactNode
  disabled?: boolean
  isBold?: boolean
}

type Props = {
  urls: DirectionURL[]
  addAdmin?: boolean
  className?: ClassValue
}

export const Directions = ({ urls, addAdmin = true, className }: Props) => {
  return (
    <Breadcrumb className={cn(className, "my-4")}>
      <BreadcrumbList>
        {addAdmin && (
          <React.Fragment>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={employeesRoutes.dashboard.root}>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        )}
        {urls.map((url, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {url.disabled ? (
                <p className='font-bold'>{url.label}</p>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={url.href} className={cn(url.isBold && "font-semibold")}>
                    {url.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator className='last-of-type:hidden' />
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
