import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"
import { findOrderById } from "@/app/dashboard/(helpers)/_actions/orders"
import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"
import { AdminOrderDetails } from "@/app/dashboard/(helpers)/_components/orders/order-details"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { notFound, redirect } from "next/navigation"
import React from "react"

type Props = {
  params: Promise<{ orderId: string }>
}

export default async function ViewOrderPage({ params }: Props) {
  const { orderId } = await params

  const order = await findOrderById(+orderId)
  const hasAccessToView = await hasAccessTo("orders", "view-products")

  if (!order) return notFound()
  if (!hasAccessToView) return redirect(employeesRoutes.dashboard.root)

  const pageTitle = (
    <span>
      Order - <b>#{order.orderNumber}</b>
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <AdminOrderDetails order={order} />
    </div>
  )
}
