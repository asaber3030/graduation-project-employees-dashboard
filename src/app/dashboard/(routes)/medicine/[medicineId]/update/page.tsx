import db from "@/services/prisma"

import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"
import React from "react"

import { findMedicine } from "@/app/dashboard/(helpers)/_actions/medicine"
import { notFound, redirect } from "next/navigation"

import { AdminUpdateMedicineForm } from "@/app/dashboard/(helpers)/_components/medicine/update-form"
import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"

type Props = {
  params: {
    medicineId: string
  }
}

export default async function UpdateMedicinePage({ params }: Props) {
  const medicineId = +params.medicineId
  const medicine = await findMedicine({ id: medicineId })
  const dosageForms = await db.dosageForm.findMany()

  const hasAccessToUpdatePromise = hasAccessTo("medicine", "update-medicine")
  const [hasAccessToUpdate] = await Promise.all([hasAccessToUpdatePromise])
  if (!hasAccessToUpdate) return redirect(employeesRoutes.dashboard.root)

  if (!medicine) return notFound()

  const pageTitle = (
    <span>
      Update Medicine -{" "}
      <b>
        {medicine.enName} # {medicine.id}
      </b>
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <AdminUpdateMedicineForm medicine={medicine} dosageForms={dosageForms} />
    </div>
  )
}
