import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminUpdateCategoryForm } from "@/app/dashboard/(helpers)/_components/categories/update-form"

import { findCategoryById } from "@/app/dashboard/(helpers)/_actions/categories"
import { getHospitals } from "@/actions/app"
import { notFound, redirect } from "next/navigation"
import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"

type Props = {
  params: Promise<{ categoryId: string }>
}

export default async function CreateProductPage({ params }: Props) {
  const { categoryId } = await params

  const category = await findCategoryById(+categoryId)
  const hospitals = await getHospitals()
  const hasAccessToUpdate = await hasAccessTo("categories", "update-categories")

  if (!category) return notFound()
  if (!hasAccessToUpdate) return redirect("/dashboard")

  return (
    <div>
      <AdminPageTitle title='Update Category' />
      <AdminUpdateCategoryForm hospitals={hospitals} category={category} />
    </div>
  )
}
