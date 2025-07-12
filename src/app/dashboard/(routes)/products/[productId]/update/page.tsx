import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminCreateProductForm } from "@/app/dashboard/(helpers)/_components/products/create-form"

import { findProductById } from "@/app/dashboard/(helpers)/_actions/products"
import { notFound, redirect } from "next/navigation"
import { AdminUpdateProductForm } from "@/app/dashboard/(helpers)/_components/products/update-form"
import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"

type Props = {
  params: Promise<{ productId: string }>
}

export default async function CreateProductPage({ params }: Props) {
  const { productId } = await params

  const product = await findProductById(+productId)
  const hasAccessToUpdate = await hasAccessTo("products", "update-products")

  if (!product) return notFound()
  if (!hasAccessToUpdate) return redirect("/dashboard")

  return (
    <div>
      <AdminPageTitle title='Update Product' />
      <AdminUpdateProductForm product={product} />
    </div>
  )
}
