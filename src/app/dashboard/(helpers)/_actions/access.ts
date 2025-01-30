"use server"

import db from "@/services/prisma"
import { getCurrentEmployee } from "./auth"

export async function hasAccessTo(group: string, action: string) {
  const employee = await getCurrentEmployee()
  if (!employee) return false

  const hasAccess = await db.employeePermission.findFirst({
    where: {
      employeeId: employee.id,
      permission: {
        permissionCode: action,
        group: {
          groupCode: group
        }
      }
    }
  })

  return !!hasAccess
}
