"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { ClassValue } from "class-variance-authority/types"
import { ArrowRight } from "lucide-react"
import { build } from "search-params"
import { SearchParams } from "@/types"

type Props = {
  className?: ClassValue
  disabled?: boolean
  searchParams?: SearchParams
}

export const PaginateNext = ({ searchParams, disabled, className }: Props) => {
  const params = useSearchParams()
  const router = useRouter()
  const pageParam = params.get("page")
  const pageNumber = Number(pageParam)
  const verifyNaN = isNaN(pageNumber)
  const page = !verifyNaN ? pageNumber : 2

  const finalURL = build({
    ...searchParams,
    page: !page ? 2 : page + 1,
  })

  return (
    <Button variant="outline" className={cn("bg-white", className)} disabled={disabled} onClick={() => router.push(`?${finalURL}`)}>
      Next
      <ArrowRight className="size-4 text-secondaryMain" />
    </Button>
  )
}
