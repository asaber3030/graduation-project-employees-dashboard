"use server"

import z from "zod"

import { LoginSchema } from "@/schema"
import { APIResponse } from "@/types"

import { API_URL, COOKIE_NAME, defaultExpirationToken } from "@/lib/constants"
import { cookies } from "next/headers"

export async function loginAction(data: z.infer<typeof LoginSchema>, rememberMe: boolean = false) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ ...data, rememberMe })
    })

    const response: APIResponse<{ token: string }, any> = await res.json()
    if (response.data?.token) {
      cookies().set(COOKIE_NAME, response?.data.token, {
        expires: defaultExpirationToken
      })
    }

    return response
  } catch (error) {
    console.dir({ fromLoginAction: error }, { depth: null })
  }
}
