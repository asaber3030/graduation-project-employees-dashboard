import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { AdminPrescriptionPrintButton } from "@/app/dashboard/(helpers)/_components/prescriptions/prescription-print-button"
import { AdminUpdatePrescriptionItemForm } from "@/app/dashboard/(helpers)/_components/prescriptions/update-prescription-item"
import { LinkBtn } from "@/components/common/link-btn"
import { Plus } from "lucide-react"

import {
  findPrescriptionById,
  findPrescriptionItem
} from "@/app/dashboard/(helpers)/_actions/prescriptions"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { notFound } from "next/navigation"

type Props = {
  params: {
    prescriptionId: string
    itemId: string
  }
}

export default async function UpdatePrescriptionItemId({ params }: Props) {
  const prescriptionId = +params.prescriptionId
  const itemId = +params.prescriptionId
  const prescription = await findPrescriptionById(prescriptionId)
  const item = await findPrescriptionItem(itemId)

  if (!prescription) return notFound()
  if (!item) return notFound()

  const pageTitle = (
    <span>
      Update Prescription Medication - <b>#{prescription.id}</b>
    </span>
  )

  return (
    <div className='space-y-4'>
      <AdminPageTitle title={pageTitle} parentClassName='print:hidden'>
        <AdminPrescriptionPrintButton />
        <LinkBtn
          icon={Plus}
          variant='success'
          href={employeesRoutes.prescriptions.createPrescrptionItem(prescriptionId)}
        >
          Create Medication
        </LinkBtn>
      </AdminPageTitle>

      <AdminUpdatePrescriptionItemForm item={item} />
    </div>
  )
}
