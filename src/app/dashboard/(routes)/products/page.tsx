import AdminPageTitle from "../../(helpers)/_components/common/title"

import { AdminProductsTable } from "../../(helpers)/_components/products/table"
import { SearchParams } from "@/types"
import { LinkBtn } from "@/components/common/link-btn"
import { Plus } from "lucide-react"

import { paginateProducts } from "../../(helpers)/_actions/products"
import { employeesRoutes } from "../../(helpers)/_utils/routes"
import { hasAccessTo } from "../../(helpers)/_actions/access"
import { redirect } from "next/navigation"

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function ProductPage({ searchParams }: Props) {
  const sp = await searchParams
  const products = await paginateProducts(sp)

  const hasAccessToViewPromise = hasAccessTo("products", "view-products")
  const hasAccessToCreatePromise = hasAccessTo("products", "create-products")
  const hasAccessToUpdatePromise = hasAccessTo("products", "update-products")
  const hasAccessToDeletePromise = hasAccessTo("products", "delete-products")

  const [hasAccessToView, hasAccessToCreate, hasAccessToUpdate, hasAccessToDelete] = await Promise.all([hasAccessToViewPromise, hasAccessToCreatePromise, hasAccessToUpdatePromise, hasAccessToDeletePromise])

  if (!hasAccessToView) return redirect(employeesRoutes.dashboard.root)

  return (
    <div>
      <AdminPageTitle title='Products'>
        {hasAccessToCreate && (
          <LinkBtn href={employeesRoutes.products.create} icon={Plus}>
            Create Product
          </LinkBtn>
        )}
      </AdminPageTitle>
      <AdminProductsTable hasAccessToUpdate={hasAccessToUpdate} hasAccessToDelete={hasAccessToDelete} hasNextPage={!products.hasNextPage} searchParams={sp} data={products.products} />
    </div>
  )
}
