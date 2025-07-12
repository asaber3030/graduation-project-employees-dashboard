import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import { UpdateHospitalForm } from "@/app/dashboard/(helpers)/_components/hospitals/update-form"

import { showHospitalName } from "@/lib/utils"
import { getHospital } from "@/actions/app"
import { notFound } from "next/navigation"
import { UpdateHospitalPasswordForm } from "@/app/dashboard/(helpers)/_components/hospitals/change-password-form"
import { Separator } from "@/components/ui/separator"

type Props = {
  params: { hospitalId: string }
}

export default async function HospitalIdUpdatePage({ params }: Props) {
  const hospitalId = +params.hospitalId
  const hospital = await getHospital({ id: hospitalId })

  if (!hospital) return notFound()

  const pageTitle = (
    <span>
      Update <b>{showHospitalName(hospital)}</b>
    </span>
  )

  return (
    <div className='space-y-4'>
      <AdminPageTitle title={pageTitle} />
      <div>
        <h2 className='text-lg mb-2 pb-1 border-b font-semibold'>Hospital Details</h2>
        <UpdateHospitalForm hospital={hospital} />
      </div>

      <div>
        <h2 className='text-lg mb-2 pb-1 border-b font-semibold'>Hospital Password Manager</h2>
        <UpdateHospitalPasswordForm hospital={hospital} />
      </div>
    </div>
  )
}
