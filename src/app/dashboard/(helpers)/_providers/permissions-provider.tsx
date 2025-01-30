"use client"

import React, { createContext } from "react"
import { ResourcePermission, ResourcePermissionGroup } from "@prisma/client"

export type TEmployeePermission = ResourcePermissionGroup

export const EmployeePermissionsContext = createContext<TEmployeePermission[]>([])

type Props = {
  permissions: TEmployeePermission[]
  children: React.ReactNode
}

export const EmployeePermissionsProvider = ({ permissions, children }: Props) => {
  return (
    <EmployeePermissionsContext.Provider value={permissions}>
      {children}
    </EmployeePermissionsContext.Provider>
  )
}
