"use server"

import db from "@/services/prisma"

import { PermissionGroupSchema } from "@/schema"

import { revalidatePath } from "next/cache"
import { actionResponse } from "@/lib/api"
import { employeesRoutes } from "../_utils/routes"
import { z } from "zod"

export async function getPermissionGroups() {
  return db.resourcePermissionGroup.findMany({
    orderBy: { id: "desc" }
  })
}

export async function getPermissionGroupsWithPermissions() {
  return db.resourcePermissionGroup.findMany({
    include: {
      permissions: true
    },
    orderBy: { id: "desc" }
  })
}

export async function getPermissionGroupById(id: number) {
  return db.resourcePermissionGroup.findUnique({
    where: { id },
    include: {
      permissions: true
    }
  })
}

export async function createPermissionGroupAction(
  data: z.infer<typeof PermissionGroupSchema.create>
) {
  const isGroupExists = await db.resourcePermissionGroup.findFirst({
    where: {
      groupName: data.groupName
    }
  })
  if (isGroupExists) return actionResponse(404, "Permission Group already exists")

  const findCode = await db.resourcePermissionGroup.findUnique({
    where: {
      groupCode: data.groupCode
    },
    select: { id: true }
  })

  if (findCode) return actionResponse(404, "Permission Group code already exists")

  await db.resourcePermissionGroup.create({
    data
  })
  revalidatePath(employeesRoutes.permissions.root)
  return actionResponse(200, "Permission Group created successfully")
}

export async function updatePermissionGroupAction(
  groupId: number,
  data: z.infer<typeof PermissionGroupSchema.update>
) {
  await db.resourcePermissionGroup.update({
    where: { id: groupId },
    data: {
      ...data
    }
  })
  revalidatePath(employeesRoutes.permissions.root)
  return actionResponse(200, "Permission Group updated successfully")
}

export async function deletePermissionGroupAction(id: number) {
  await db.resourcePermissionGroup.delete({ where: { id } })
  revalidatePath(employeesRoutes.permissions.root)
  return actionResponse(200, "Permission Group deleted successfully")
}
