import moment from "moment"
import { APIResponse, SearchParams } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod"
import { responseCodes } from "./api"
import { toast } from "sonner"
import { Hospital } from "@prisma/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showHospitalName(hospital: Hospital | undefined) {
  return `${hospital?.name} - ${hospital?.location}`
}

export function generateArray(length: number) {
  return Array.from({ length })
}

export function extractToken(headers: string) {
  return headers.split(" ")[1]
}

export function extractErrors(errors: ZodError) {
  return errors.flatten().fieldErrors
}

export function randomHexColorCode() {
  let colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-teal-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-gray",
    "bg-orange-500"
  ]
  return colors[Math.floor(Math.random() * 6)]
}

export function diffForHuman(date: Date) {
  return moment(date).fromNow()
}

export function formatDate(date: Date, format: string = "lll") {
  return moment(date).format(format)
}

export function createPagination(
  params: SearchParams,
  totalCount: number,
  skipLimit: boolean = false
) {
  const numPage = Number(params.page)
  const page = isNaN(numPage) ? 1 : numPage
  const take = params.take ? +params.take : 10

  const orderBy = params.orderBy ?? "id"
  const orderType = params.orderType ?? "desc"

  let skip = (page - 1) * (skipLimit ? 0 : take)

  const totalPages = Math.ceil(totalCount / take)
  const hasNextPage = page < totalPages

  return {
    args: {
      orderBy: { [orderBy ?? "id"]: orderType ?? "asc" },
      skip,
      take
    },
    page,
    take,
    orderBy,
    orderType,
    skip,
    totalPages,
    hasNextPage
  }
}

export function showResponseMessage<T, P>(data: APIResponse<T, P>, exectue?: Function) {
  if (data?.status === responseCodes.ok) {
    toast.success(data.message)
    if (exectue) exectue()
  } else {
    toast.error(data.message)
  }
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat("en-US").format(num)
}
