import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { Plus } from "lucide-react"

import { notFound } from "next/navigation"
import { AdminPrescriptionDoctorCard } from "@/app/dashboard/(helpers)/_components/prescriptions/prescription-doctor-card"
import { AdminPrescriptionPatientCard } from "@/app/dashboard/(helpers)/_components/prescriptions/prescription-patient-card"
import { AdminSinglePrescriptionItem } from "@/app/dashboard/(helpers)/_components/prescriptions/single-prescription-item"
import { EmptyState } from "@/components/common/empty-state"
import { AdminPrescriptionPrintButton } from "@/app/dashboard/(helpers)/_components/prescriptions/prescription-print-button"
import { AdminPrescriptionDetailsCard } from "@/app/dashboard/(helpers)/_components/prescriptions/prescription-details-card"
import { LinkBtn } from "@/components/common/link-btn"

import {
  findPrescriptionById,
  findPrescriptionMedications
} from "@/app/dashboard/(helpers)/_actions/prescriptions"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { formatDate } from "@/lib/utils"

type Props = {
  params: {
    prescriptionId: string
  }
}

export default async function PrescriptionId({ params }: Props) {
  const prescriptionId = +params.prescriptionId
  const prescription = await findPrescriptionById(prescriptionId)
  const prescriptionItems = await findPrescriptionMedications(prescriptionId)

  if (!prescription) return notFound()

  const pageTitle = (
    <span>
      Prescription - <b>#{prescription.id}</b>
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

      <section className='col-span-2 w-full'>
        <p className='text-lg font-medium mb-1'>Prescription</p>
        <section className='grid xl:grid-cols-3 grid-cols-1 gap-2 print:grid-cols-2'>
          <div className='print:col-span-3'>
            <AdminPrescriptionDetailsCard prescription={prescription} />
          </div>
          <AdminPrescriptionDoctorCard doctor={prescription.doctor} />
          <AdminPrescriptionPatientCard patient={prescription.patient} />
        </section>
      </section>

      <section className='col-span-3'>
        <p className='text-lg font-medium mb-1'>Prescription Medications</p>
        {prescriptionItems.length === 0 ? (
          <EmptyState title='No medications were added.' />
        ) : (
          <div className='border rounded-md p-4 space-y-4'>
            {prescriptionItems.map((item, index) => (
              <AdminSinglePrescriptionItem key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
        <p className='text-sm mt-2'>
          This prescription was issued in <b>{formatDate(prescription.createdAt)}</b>
        </p>
      </section>
    </div>
  )
}
