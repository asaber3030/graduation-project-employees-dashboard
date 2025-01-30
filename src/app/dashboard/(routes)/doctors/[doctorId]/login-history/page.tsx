import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { SearchParams } from "@/types"
import { AdminDoctorPrintButton } from "@/app/dashboard/(helpers)/_components/doctors/print-button"
import { AdminDoctorLoginHistory } from "@/app/dashboard/(helpers)/_components/doctors/login-history"

import { findDoctor } from "@/app/dashboard/(helpers)/_actions/doctors"
import { notFound } from "next/navigation"

import db from "@/services/prisma"

type Props = {
  searchParams: SearchParams
  params: {
    doctorId: string
  }
}

export default async function DoctorIdDoctorHistory({ searchParams, params }: Props) {
  const doctorId = +params.doctorId
  const doctor = await findDoctor({ id: doctorId })

  if (!doctor) return notFound()

  const loginHistory = await db.doctorLoginHistory.findMany({
    where: {
      doctorId
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const pageTitle = (
    <span>
      Doctor <b>{doctor.name}</b> - Login History
    </span>
  )

  return (
    <div>
      <AdminPageTitle title={pageTitle}>
        <AdminDoctorPrintButton />
      </AdminPageTitle>

      <AdminDoctorLoginHistory loginHistory={loginHistory} />
    </div>
  )
}
