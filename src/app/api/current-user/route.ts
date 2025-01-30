import { NextRequest } from "next/server"
import { Admin } from "@prisma/client"

import { response } from "@/lib/api"
import { extractToken } from "@/lib/utils"
import { findEmployee } from "@/app/dashboard/(helpers)/_actions/employees"

import jwt from "jsonwebtoken"

export const revalidate = 0

export async function GET(req: NextRequest) {
  try {
    const authorization = req.headers.get("Authorization")
    if (!authorization) return response(401, "Unauthorized")

    const token = extractToken(authorization) ?? ""
    if (!token) return response(401, "Unauthorized")

    const secret = process.env.ADMIN_SECRET!
    const decodedResult = jwt.verify(token, secret) as Admin

    const employeeWithPassword = await findEmployee({ id: decodedResult.id })
    if (!employeeWithPassword) return response(401, "Unauthorized")

    const { password, ...employee } = employeeWithPassword
    return response(200, "Authorized", { employee })
  } catch (error) {
    return response(401, "Unauthorized", error)
  }
}
