"use client"

import { useRouter } from "next/navigation"
import { build } from "search-params"

import { SearchParams } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = { searchParams: SearchParams }

export const OrderTypeFilter = ({ searchParams }: Props) => {
  const router = useRouter()

  const handleChange = (value: string) => {
    const query = build({ ...searchParams, orderType: value })
    router.push("?" + query)
  }

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="bg-white">
        <SelectValue placeholder={"Order Type"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"asc"}>Asecending</SelectItem>
        <SelectItem value={"desc"}>Desecending</SelectItem>
      </SelectContent>
    </Select>
  )
}
