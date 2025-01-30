"use server"

import db from "@/services/prisma"

import { EmployeePermissionSchema, PermissionSchema } from "@/schema"
import { SearchParams } from "@/types"

import { createPagination } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { actionResponse } from "@/lib/api"
import { employeesRoutes } from "../_utils/routes"
import { z } from "zod"

export async function getPermissionsByGroupId(groupId: number) {
  return db.resourcePermission.findMany({
    where: { groupId },
    include: {
      _count: {
        select: { employeePermission: true }
      }
    }
  })
}

export async function getPermissionById(id: number) {
  return db.resourcePermission.findUnique({
    where: { id },
    include: {
      group: true
    }
  })
}

export async function createPermissionAction(
  groupId: number,
  data: z.infer<typeof PermissionSchema.create>
) {
  const findFirstPermission = await db.resourcePermission.findFirst({
    where: {
      permissionName: data.permissionName,
      groupId
    }
  })
  if (findFirstPermission) return actionResponse(404, "Permission already exists")

  const findCode = await db.resourcePermission.findUnique({
    where: {
      permissionCode: data.permissionCode
    },
    select: { id: true }
  })

  const findGroup = await db.resourcePermissionGroup.findUnique({
    where: { id: groupId }
  })
  if (!findGroup) return actionResponse(404, "Permission group not found")

  if (findCode) return actionResponse(404, "Permission code already exists")

  await db.resourcePermission.create({
    data: {
      groupId,
      ...data
    }
  })
  revalidatePath(employeesRoutes.permissions.root)
  return actionResponse(200, "Permission created successfully")
}

export async function updatePermissionAction(
  permissionId: number,
  data: z.infer<typeof PermissionSchema.update>
) {
  await db.resourcePermission.update({
    where: { id: permissionId },
    data: {
      ...data
    }
  })
  revalidatePath(employeesRoutes.permissions.root)
  revalidatePath(employeesRoutes.permissions.view(permissionId))
  return actionResponse(200, "Permission updated successfully")
}

export async function deletePermissionAction(id: number) {
  const deleted = await db.resourcePermission.delete({ where: { id } })
  return actionResponse(200, "Permission deleted successfully")
}

export async function deleteEmployeePermissionAction(id: number) {
  const deletedPermission = await db.employeePermission.delete({ where: { id } })
  const findPermission = await db.resourcePermission.findUnique({
    where: { id: deletedPermission.permissionId }
  })
  revalidatePath(
    employeesRoutes.permissions.viewPermission(
      findPermission?.groupId as number,
      findPermission?.id as number
    )
  )
  return actionResponse(200, "Employee permission deleted successfully")
}

export async function paginateEmployeesByPermissionId(
  permissionId: number,
  searchParams: SearchParams
) {
  const total = await db.employeePermission.count({
    where: { permissionId }
  })

  const pagination = createPagination(searchParams, total)
  const employees = await db.employeePermission.findMany({
    where: {
      permissionId,
      OR: [
        {
          employee: {
            name: {
              contains: searchParams.search ?? ""
            }
          }
        }
      ]
    },
    include: {
      employee: true,
      permission: true
    },
    ...pagination.args
  })

  return {
    employees,
    ...pagination
  }
}

export async function quickAssignPermissionAction(
  permissionId: number,
  data: z.infer<typeof EmployeePermissionSchema.quickAssign>
) {
  const findPermission = await db.resourcePermission.findUnique({
    where: { id: permissionId }
  })
  if (!findPermission) return actionResponse(404, "Permission not found")

  const findEmployee = await db.employee.findUnique({
    where: { email: data.employeeEmail }
  })
  if (!findEmployee) return actionResponse(404, "Employee not found")

  const findEmployeePermission = await db.employeePermission.findFirst({
    where: {
      permissionId,
      employeeId: findEmployee.id
    }
  })

  if (findEmployeePermission)
    return actionResponse(
      404,
      "Employee already has this permission " + findPermission.permissionName
    )

  await db.employeePermission.create({
    data: {
      permissionId,
      employeeId: findEmployee.id
    }
  })
  revalidatePath(employeesRoutes.permissions.view(permissionId))
  return actionResponse(200, "Permission assigned successfully")
}
