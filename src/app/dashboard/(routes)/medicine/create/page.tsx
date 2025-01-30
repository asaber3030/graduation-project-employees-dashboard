import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"
import db from "@/services/prisma"

import { AdminCreateMedicineForm } from "@/app/dashboard/(helpers)/_components/medicine/create-form"
import { getHospitals } from "@/actions/app"
import { hasAccessTo } from "@/app/dashboard/(helpers)/_actions/access"
import { redirect } from "next/navigation"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"

export default async function CreateMedicinePage() {
  const hospitals = await getHospitals()
  const dosageForms = await db.dosageForm.findMany()

  const hasAccessToCreatePromise = hasAccessTo("medicine", "create-medicine")
  const [hasAccessToCreate] = await Promise.all([hasAccessToCreatePromise])
  if (!hasAccessToCreate) return redirect(employeesRoutes.dashboard.root)

  return (
    <div>
      <AdminPageTitle title='Create Medicine' />
      <AdminCreateMedicineForm dosageForms={dosageForms} hospitals={hospitals} />
    </div>
  )
}
