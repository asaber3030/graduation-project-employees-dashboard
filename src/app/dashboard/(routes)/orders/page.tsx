import AdminPageTitle from "../../(helpers)/_components/common/title"

import { SearchParams } from "@/types"
import { paginateOrders } from "../../(helpers)/_actions/orders"
import { AdminOrdersTable } from "../../(helpers)/_components/orders/table"
import { hasAccessTo } from "../../(helpers)/_actions/access"
import { employeesRoutes } from "../../(helpers)/_utils/routes"
import { redirect } from "next/navigation"

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function AllOrders({ searchParams }: Props) {
  const sp = await searchParams
  const orders = await paginateOrders(sp)

  const hasAccessToView = await hasAccessTo("orders", "view-products")

  if (!hasAccessToView) return redirect(employeesRoutes.dashboard.root)

  return (
    <div>
      <AdminPageTitle title='Orders' />
      <AdminOrdersTable data={orders.orders} searchParams={sp} hasNextPage={!orders.hasNextPage} showFilters={true} />
    </div>
  )
}
