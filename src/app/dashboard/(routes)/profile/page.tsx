import { UpdateHospitalPasswordForm } from "../../(helpers)/_components/hospitals/change-password-form"
import { UpdateHospitalForm } from "../../(helpers)/_components/hospitals/update-form"
import { currentHospital } from "@/actions/app"

export default async function UpdateProfilePage() {
  const hospital = await currentHospital()

  return (
    <div className='space-y-4'>
      <div>
        <h2 className='text-lg mb-2 pb-1 border-b font-semibold'>Hospital Details</h2>
        <UpdateHospitalForm hospital={hospital} />
      </div>

      <div>
        <h2 className='text-lg mb-2 pb-1 border-b font-semibold'>Hospital Password</h2>
        <UpdateHospitalPasswordForm hospital={hospital} />
      </div>
    </div>
  )
}
