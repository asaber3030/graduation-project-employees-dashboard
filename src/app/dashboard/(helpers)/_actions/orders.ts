"use server"

import db from "@/services/prisma"

import { SearchParams } from "@/types"

import { createPagination } from "@/lib/utils"

export async function paginateOrders(searchParams: SearchParams) {
  const total = await db.order.count()

  const pagination = createPagination(searchParams, total)

  const orders = await db.order.findMany({
    where: {
      OR: [{ orderNumber: { contains: searchParams.search ?? "" } }]
    },
    include: {
      items: {
        include: {
          product: true
        }
      },
      patient: true
    },
    ...pagination.args
  })

  return {
    orders,
    ...pagination
  }
}

export async function findOrderById(id: number) {
  return await db.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true
        }
      },
      patient: true
    }
  })
}
