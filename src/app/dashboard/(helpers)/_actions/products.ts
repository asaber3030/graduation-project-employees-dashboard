"use server"

import db from "@/services/prisma"

import { ProductSchema } from "@/schema"
import { SearchParams } from "@/types"

import { createPagination } from "@/lib/utils"
import { currentHospital, uploadToCloudinary } from "@/actions/app"
import { actionResponse } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { employeesRoutes } from "../_utils/routes"
import { z } from "zod"

export async function paginateProducts(searchParams: SearchParams, hospitalId?: number) {
  let hospital = await currentHospital()

  const total = await db.product.count()

  const pagination = createPagination(searchParams, total)

  const products = await db.product.findMany({
    where: {
      OR: [{ name: { contains: searchParams.search ?? "" } }]
    },
    include: { category: true },
    ...pagination.args
  })

  return {
    products,
    ...pagination
  }
}

export async function paginateProductsByCategoryId(searchParams: SearchParams, categoryId: number) {
  const total = await db.product.count({
    where: { categoryId }
  })

  const pagination = createPagination(searchParams, total)

  const products = await db.product.findMany({
    where: {
      OR: [{ name: { contains: searchParams.search ?? "" } }],
      categoryId
    },
    include: { category: true },
    ...pagination.args
  })

  return {
    products,
    ...pagination
  }
}

export async function findProductById(id: number) {
  return await db.product.findUnique({
    where: { id },
    include: { category: true }
  })
}

export async function createProductAction(categoryId: number, formData: FormData, data: z.infer<typeof ProductSchema>) {
  const imageFile = formData.get("image") as File
  if (!imageFile) return actionResponse(400, "Image file is required")

  let image = await uploadToCloudinary(imageFile, "products")

  await db.product.create({
    data: {
      ...data,
      image,
      categoryId
    }
  })

  revalidatePath(employeesRoutes.products.root)

  return actionResponse(200, "Product created successfully")
}

export async function updateProductAction(id: number, categoryId: number, formData: FormData, data: z.infer<typeof ProductSchema>) {
  const product = await db.product.findUnique({
    where: { id },
    select: { image: true }
  })

  if (!product) return actionResponse(404, "Product not found")

  let image = product.image

  if (formData) {
    const imageFile = formData.get("image") as File
    if (imageFile && imageFile.size > 0) {
      image = await uploadToCloudinary(imageFile, "products")
    }
  }

  await db.product.update({
    where: { id },
    data: {
      ...data,
      image,
      categoryId
    }
  })

  revalidatePath(employeesRoutes.products.root)

  return actionResponse(200, "Product updated successfully")
}

export async function deleteProductAction(id: number) {
  await db.product.delete({ where: { id } })
  revalidatePath(employeesRoutes.products.root)
  return actionResponse(200, "Product deleted successfully")
}
