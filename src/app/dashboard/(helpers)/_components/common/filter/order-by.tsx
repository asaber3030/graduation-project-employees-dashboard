"use client"

import { useRouter } from "next/navigation"
import { build } from "search-params"

import { OrderBy, SearchParams } from "@/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = { searchParams: SearchParams; orderByArray: OrderBy[] }

export const OrderByFilter = ({ searchParams, orderByArray }: Props) => {
  const router = useRouter()

  const handleChange = (value: string) => {
    const query = build({ ...searchParams, orderBy: value })
    router.push("?" + query)
  }

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="bg-white">
        <SelectValue placeholder="Order By" />
      </SelectTrigger>
      <SelectContent>
        {orderByArray.map((item, idx) => (
          <SelectItem key={idx} value={item.name}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
