"use server"

import { APIResponse } from "@/types"
import { Admin, Employee } from "@prisma/client"

import { getHeaders } from "@/lib/api"
import { cookies } from "next/headers"
import { API_URL, COOKIE_NAME } from "@/lib/constants"

type GetEmployeeResponseType = {
  employee: Employee
}

export async function getCurrentEmployee() {
  const token = cookies().get(COOKIE_NAME)?.value
  const res = await fetch(`${API_URL}/current-user`, getHeaders(token))
  const data: APIResponse<GetEmployeeResponseType, any> = await res.json()
  return data.data?.employee as Employee
}
