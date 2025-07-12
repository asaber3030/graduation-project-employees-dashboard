import { AdminCreateProductForm } from "@/app/dashboard/(helpers)/_components/products/create-form"

import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"
import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"
import { redirect } from "next/navigation"

export default async function CreateProductPage() {
  const hasAccessToCreate = await hasAccessTo("products", "create-products")

  if (!hasAccessToCreate) return redirect("/dashboard")

  return (
    <div>
      <AdminPageTitle title='Create Product' />
      <AdminCreateProductForm />
    </div>
  )
}
