"use client"

import Cookies from "js-cookie"

import { useHospitals } from "@/hooks/useHospitals"
import { useRouter } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { ClassValue } from "class-variance-authority/types"

import { cn } from "@/lib/utils"
import { ADMIN_COOKIE_HOSPITAL_ID } from "../../_utils/constants"

type Props = {
  className?: ClassValue
  skeletonClassName?: ClassValue
  onChange?: (value: string) => void
}

export const HospitalsSwitcher = ({ className, skeletonClassName }: Props) => {
  const { hospitals, isHospitalsLoading } = useHospitals()
  const { refresh } = useRouter()

  const handleChange = (value: string) => {
    Cookies.set(ADMIN_COOKIE_HOSPITAL_ID, value)
    refresh()
  }

  if (isHospitalsLoading) return <Skeleton className={cn("w-full h-8", skeletonClassName)} />

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder="Choose A Hospital" />
      </SelectTrigger>
      <SelectContent>
        {hospitals?.map((hospital) => (
          <SelectItem key={`hospital-sw-${hospital.id}`} value={String(hospital.id)}>
            {hospital.name + " - " + hospital.location}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
