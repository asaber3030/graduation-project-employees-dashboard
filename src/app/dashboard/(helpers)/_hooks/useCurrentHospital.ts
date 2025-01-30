import { useContext } from "react"
import { HospitalContext } from "../_providers/hospital-provider"
import { Hospital } from "@prisma/client"

export function useCurrentHospital() {
  const hospital = useContext(HospitalContext)
  return hospital as Hospital
}
