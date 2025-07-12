"use server"

import db from "@/services/prisma"

import { SearchParams } from "@/types"
import { CategorySchema } from "@/schema"

import { createPagination } from "@/lib/utils"
import { currentHospital, uploadToCloudinary } from "@/actions/app"
import { actionResponse } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { employeesRoutes } from "../_utils/routes"
import { z } from "zod"

export async function paginateCategories(searchParams: SearchParams, hospitalId?: number) {
  let hospital = await currentHospital()
  let specificId = hospital.id

  if (hospitalId) specificId = hospitalId

  const total = await db.category.count({
    where: { hospitalId: specificId }
  })

  const pagination = createPagination(searchParams, total)

  const categories = await db.category.findMany({
    where: {
      OR: [{ name: { contains: searchParams.search ?? "" } }],
      hospitalId: specificId
    },
    include: { hospital: true },
    ...pagination.args
  })

  return {
    categories,
    ...pagination
  }
}

export async function searchCategories(search?: string) {
  const categories = await db.category.findMany({
    where: {
      OR: [{ name: { contains: search } }]
    },
    take: 10
  })

  return categories
}

export async function findCategoryById(id: number) {
  return await db.category.findUnique({
    where: { id },
    include: { hospital: true }
  })
}

export async function createCategoryAction(formData: FormData, data: z.infer<typeof CategorySchema>) {
  const hospital = await currentHospital()

  const image = formData.get("image") as File | null
  if (!image) return actionResponse(400, "Image is required")

  const imageUrl = await uploadToCloudinary(image, `categories`)

  const nameExists = await db.category.findFirst({
    where: { name: data.name }
  })

  if (nameExists) return actionResponse(409, "Category code already exists")

  await db.category.create({
    data: {
      ...data,
      image: imageUrl,
      hospitalId: hospital.id
    }
  })

  revalidatePath(employeesRoutes.categories.root)

  return actionResponse(200, "Category created successfully")
}

export async function updateCategoryAction(id: number, hospitalId: number, formData: FormData, data: z.infer<typeof CategorySchema>) {
  const nameExists = await db.category.findFirst({
    where: { name: data.name, AND: [{ id: { not: id } }] }
  })
  if (nameExists) return actionResponse(409, "Category name already exists")

  const category = await db.category.findUnique({
    where: { id },
    select: { image: true }
  })

  if (!category) return actionResponse(404, "Category not found")

  let image = category?.image

  const imageFile = formData.get("image") as File | null

  if (imageFile) {
    image = await uploadToCloudinary(imageFile, "categories")
  }

  await db.category.update({
    where: { id },
    data: {
      ...data,
      hospitalId,
      image
    }
  })

  revalidatePath(employeesRoutes.categories.root)
  revalidatePath(employeesRoutes.categories.view(id))

  return actionResponse(200, "Category updated successfully")
}

export async function deleteCategoryAction(id: number) {
  await db.category.delete({ where: { id } })
  revalidatePath(employeesRoutes.categories.root)
  return actionResponse(200, "Category deleted successfully")
}
