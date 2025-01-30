import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"

import React from "react"

type Props = {
  title: React.ReactNode | string
  children?: React.ReactNode
  parentClassName?: ClassValue
  labelClassName?: ClassValue
}

export default function AdminPageTitle({ title, parentClassName, children }: Props) {
  return (
    <div className={cn(parentClassName, "print:hidden flex justify-between items-center mb-4")}>
      <h1 className="xl:text-2xl md:text-2xl text-xl font-semibold">{title}</h1>
      <div className="flex gap-2">{children}</div>
    </div>
  )
}
