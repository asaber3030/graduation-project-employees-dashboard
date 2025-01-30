"use server"

import db from "@/services/prisma"

import { SearchParams } from "@/types"
import { InventorySchema } from "@/schema"

import { createPagination } from "@/lib/utils"
import { currentHospital } from "@/actions/app"
import { actionResponse } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { employeesRoutes } from "../_utils/routes"
import { z } from "zod"

export async function paginateInventories(searchParams: SearchParams, hospitalId?: number) {
  let hospital = await currentHospital()
  let specificId = hospital.id

  if (hospitalId) specificId = hospitalId

  const total = await db.inventory.count({
    where: { hospitalId: specificId }
  })

  const pagination = createPagination(searchParams, total)

  const inventories = await db.inventory.findMany({
    where: {
      OR: [
        { name: { contains: searchParams.search ?? "" } },
        { code: { contains: searchParams.search ?? "" } }
      ],
      hospitalId: specificId
    },
    include: { department: true, hospital: true },
    ...pagination.args
  })

  return {
    inventories,
    ...pagination
  }
}

export async function paginateInventoriesByDepartmentId(
  searchParams: SearchParams,
  departmentId: number
) {
  let hospital = await currentHospital()
  let specificId = hospital.id

  const total = await db.inventory.count({
    where: { hospitalId: specificId, departmentId }
  })

  const pagination = createPagination(searchParams, total)

  const inventories = await db.inventory.findMany({
    where: {
      OR: [
        { name: { contains: searchParams.search ?? "" } },
        { code: { contains: searchParams.search ?? "" } }
      ],
      hospitalId: specificId,
      departmentId
    },
    include: { department: true, hospital: true },
    ...pagination.args
  })

  return {
    inventories,
    ...pagination
  }
}

export async function searchInventories(search?: string) {
  const inventories = await db.inventory.findMany({
    where: {
      OR: [{ name: { contains: search } }, { code: { contains: search } }]
    },
    take: 10
  })

  return inventories
}

export async function findInventoryById(id: number) {
  return await db.inventory.findUnique({
    where: { id },
    include: { department: true, hospital: true }
  })
}

export async function createInventoryAction(
  departmentId: number,
  data: z.infer<typeof InventorySchema.create>
) {
  const hospital = await currentHospital()

  const codeExists = await db.inventory.findUnique({
    where: { code: data.code }
  })

  if (codeExists) return actionResponse(409, "Inventory code already exists")

  await db.inventory.create({
    data: {
      ...data,
      departmentId,
      hospitalId: hospital.id
    }
  })

  revalidatePath(employeesRoutes.inventories.root)

  return actionResponse(200, "Inventory created successfully")
}

export async function updateInventoryAction(
  id: number,
  data: z.infer<typeof InventorySchema.update>
) {
  const codeExists = await db.inventory.findUnique({
    where: { code: data.code, AND: [{ id: { not: id } }] }
  })
  if (codeExists) return actionResponse(409, "Inventory code already exists")

  await db.inventory.update({
    where: { id },
    data
  })

  revalidatePath(employeesRoutes.inventories.root)
  revalidatePath(employeesRoutes.inventories.view(id))

  return actionResponse(200, "Inventory updated successfully")
}

export async function deleteInventoryAction(id: number) {
  await db.inventory.delete({ where: { id } })
  revalidatePath(employeesRoutes.inventories.root)
  return actionResponse(200, "Inventory deleted successfully")
}
