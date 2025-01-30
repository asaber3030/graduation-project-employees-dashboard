import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"
import React from "react"

import { findDoctor } from "@/app/dashboard/(helpers)/_actions/doctors"
import { notFound, redirect } from "next/navigation"

import { AdminUpdateDoctorForm } from "@/app/dashboard/(helpers)/_components/doctors/update-form"
import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"

type Props = {
  params: {
    doctorId: string
  }
}

export default async function DoctorIdUpdatePage({ params }: Props) {
  const doctorId = +params.doctorId
  const doctor = await findDoctor({ id: doctorId })

  const hasAccessToCreatePromise = hasAccessTo("doctors", "update-doctor")
  const [hasAccessToView] = await Promise.all([hasAccessToCreatePromise])
  if (!hasAccessToView) return redirect(employeesRoutes.dashboard.root)

  if (!doctor) return notFound()

  const pageTitle = (
    <span>
      Update Doctor - <b>{doctor.name}</b>
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle} />
      <AdminUpdateDoctorForm doctor={doctor} />
    </div>
  )
}
