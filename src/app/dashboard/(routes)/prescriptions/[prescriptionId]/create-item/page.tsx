import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { findPrescriptionById } from "@/app/dashboard/(helpers)/_actions/prescriptions"
import { notFound } from "next/navigation"

import { AdminPrescriptionPrintButton } from "@/app/dashboard/(helpers)/_components/prescriptions/prescription-print-button"
import { AdminCreatePrescriptionItemForm } from "@/app/dashboard/(helpers)/_components/prescriptions/create-prescription-item"

type Props = {
  params: {
    prescriptionId: string
  }
}

export default async function PrescriptionId({ params }: Props) {
  const prescriptionId = +params.prescriptionId
  const prescription = await findPrescriptionById(prescriptionId)

  if (!prescription) return notFound()

  const pageTitle = (
    <span>
      Prescription - <b>#{prescription.id}</b> - Create Medication
    </span>
  )

  return (
    <div className='space-y-4'>
      <AdminPageTitle title={pageTitle} parentClassName='print:hidden'>
        <AdminPrescriptionPrintButton />
      </AdminPageTitle>

      <AdminCreatePrescriptionItemForm prescriptionId={prescription.id} />
    </div>
  )
}
