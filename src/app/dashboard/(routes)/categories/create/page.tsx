import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminCreateCategoryForm } from "@/app/dashboard/(helpers)/_components/categories/create-form"
import { getHospitals } from "@/actions/app"
import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"
import { redirect } from "next/navigation"

export default async function CreateProductPage() {
  const hospitals = await getHospitals()
  const hasAccessToCreate = await hasAccessTo("categories", "create-categories")

  if (!hasAccessToCreate) return redirect("/dashboard")

  return (
    <div>
      <AdminPageTitle title='Create Category' />
      <AdminCreateCategoryForm hospitals={hospitals} />
    </div>
  )
}
