"use client"

import React from "react"

import { FilterIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button, ButtonProps } from "@/components/ui/button"
import { SearchFilter } from "./search"
import { OrderTypeFilter } from "./order-type"
import { OrderByFilter } from "./order-by"
import { LimitFilter } from "./limit"

import { OrderBy, SearchParams } from "@/types"
import { ClassValue } from "class-variance-authority/types"

import { build } from "search-params"
import { useRouter } from "next/navigation"

type Props = ButtonProps & {
  showSearch?: boolean
  showOrderBy?: boolean
  showOrderType?: boolean
  showLimit?: boolean
  parentClassName?: ClassValue
  searchParams: SearchParams
  orderByArray: OrderBy[]
  children?: React.ReactNode
}

export const FilterButton = ({
  showSearch = true,
  showOrderBy = true,
  showOrderType = true,
  showLimit = true,
  searchParams,
  orderByArray,
  variant = "default",
  size = "default",
}: Props) => {
  const router = useRouter()
  const onSubmit = () => {
    const query = build(searchParams)
    router.push(`?${query}`)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size={size}>
          <FilterIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
          <DialogDescription>You can apply different filters to your data.</DialogDescription>
        </DialogHeader>
        <section className="flex justify-between items-center">
          <div>{showSearch && <SearchFilter searchParams={searchParams} />}</div>
          <div>
            {showOrderType && <OrderTypeFilter searchParams={searchParams} />}
            {showOrderBy && (
              <OrderByFilter orderByArray={orderByArray} searchParams={searchParams} />
            )}
            {showLimit && <LimitFilter searchParams={searchParams} />}
            <div className="flex justify-end">
              <Button onClick={onSubmit}>Filter</Button>
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}
