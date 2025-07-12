import { z } from "zod"
import { LoginSchema } from "@/schema"
import { Order, OrderItem, Patient, Product } from "@prisma/client"

export type SearchParams = {
  search?: string
  orderBy?: string
  orderType?: string
  take?: number
  skipLimit?: boolean
  page?: number
}

export type OrderBy = {
  name: string
  label: string
}

export type APIResponse<T, D> = {
  message: string
  status: number
  data?: T
  error?: D
}

export type LoginData = {
  data: z.infer<typeof LoginSchema>
  rememberMe?: boolean
}

export type Languages = "en" | "ar"

export type FullOrder = Order & {
  items: (OrderItem & {
    product: Product
  })[]
  patient: Patient
}
