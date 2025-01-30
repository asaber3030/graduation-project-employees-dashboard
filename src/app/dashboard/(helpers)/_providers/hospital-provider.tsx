"use client"

import { Hospital } from "@prisma/client"
import { createContext } from "react"

export const HospitalContext = createContext<Hospital | null>(null)

type Props = {
  children: React.ReactNode
  hospital: Hospital | null
}

export const HospitalProvider = ({ children, hospital }: Props) => {
  return <HospitalContext.Provider value={hospital}>{children}</HospitalContext.Provider>
}
