import React from "react"
import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { findInventoryById } from "@/app/dashboard/(helpers)/_actions/inventories"

import { AdminUpdateInventtoryForm } from "@/app/dashboard/(helpers)/_components/inventories/update-form"
import { LinkBtn } from "@/components/common/link-btn"
import { Plus } from "lucide-react"

import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { notFound, redirect } from "next/navigation"
import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"

type Props = {
  params: {
    inventoryId: string
  }
}

export default async function InventoryIdUpdatePage({ params }: Props) {
  const inventoryId = +params.inventoryId
  const inventory = await findInventoryById(inventoryId)

  const hasAccessToUpdatePromise = hasAccessTo("inventories", "update-inventory")
  const [hasAccessToUpdate] = await Promise.all([hasAccessToUpdatePromise])
  if (!hasAccessToUpdate) return redirect(employeesRoutes.dashboard.root)

  if (!inventory) return notFound()

  return (
    <div>
      <AdminPageTitle title='Inventories'>
        <LinkBtn icon={Plus} variant='outline' href={employeesRoutes.inventories.create}>
          Create
        </LinkBtn>
      </AdminPageTitle>

      <AdminUpdateInventtoryForm inventory={inventory} />
    </div>
  )
}
