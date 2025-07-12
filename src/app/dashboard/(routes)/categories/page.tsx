import AdminPageTitle from "../../(helpers)/_components/common/title"

import { AdminCategoriesTable } from "../../(helpers)/_components/categories/table"
import { SearchParams } from "@/types"
import { LinkBtn } from "@/components/common/link-btn"
import { Plus } from "lucide-react"

import { employeesRoutes } from "../../(helpers)/_utils/routes"
import { paginateCategories } from "../../(helpers)/_actions/categories"
import { hasAccessTo } from "../../(helpers)/_actions/access"
import { redirect } from "next/navigation"

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function CategoriesPage({ searchParams }: Props) {
  const sp = await searchParams
  const categories = await paginateCategories(sp)

  const hasAccessToViewPromise = hasAccessTo("categories", "view-categories")
  const hasAccessToCreatePromise = hasAccessTo("categories", "create-categories")
  const hasAccessToUpdatePromise = hasAccessTo("categories", "update-categories")
  const hasAccessToDeletePromise = hasAccessTo("categories", "delete-categories")

  const [hasAccessToView, hasAccessToCreate, hasAccessToUpdate, hasAccessToDelete] = await Promise.all([hasAccessToViewPromise, hasAccessToCreatePromise, hasAccessToUpdatePromise, hasAccessToDeletePromise])

  if (!hasAccessToView) return redirect(employeesRoutes.dashboard.root)

  return (
    <div>
      <AdminPageTitle title='Categories'>
        {hasAccessToCreate && (
          <LinkBtn href={employeesRoutes.categories.create} icon={Plus}>
            Create Category
          </LinkBtn>
        )}
      </AdminPageTitle>
      <AdminCategoriesTable hasAccessToUpdate={hasAccessToUpdate} hasAccessToDelete={hasAccessToDelete} hasNextPage={!categories.hasNextPage} searchParams={sp} data={categories.categories} />
    </div>
  )
}
