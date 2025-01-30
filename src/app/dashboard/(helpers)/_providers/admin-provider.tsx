"use client"

import { Admin, Employee } from "@prisma/client"
import { createContext } from "react"

export const AdminContext = createContext<Admin | null>(null)

type Props = {
  children: React.ReactNode
  employee: Employee | null
}

export const EmployeeProvider = ({ children, employee }: Props) => {
  return <AdminContext.Provider value={employee}>{children}</AdminContext.Provider>
}
