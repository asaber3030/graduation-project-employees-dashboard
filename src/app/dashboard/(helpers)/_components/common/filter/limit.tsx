"use client"

import { useRouter } from "next/navigation"
import { build } from "search-params"

import { SearchParams } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = { searchParams: SearchParams }

export const LimitFilter = ({ searchParams }: Props) => {
  const router = useRouter()

  const handleChange = (value: string) => {
    let query = build({ ...searchParams, take: value })
    router.push("?" + query)
  }

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="bg-white">
        <SelectValue placeholder={"Show"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"1"}>1</SelectItem>
        <SelectItem value={"10"}>10</SelectItem>
        <SelectItem value={"20"}>20</SelectItem>
        <SelectItem value={"50"}>50</SelectItem>
      </SelectContent>
    </Select>
  )
}
