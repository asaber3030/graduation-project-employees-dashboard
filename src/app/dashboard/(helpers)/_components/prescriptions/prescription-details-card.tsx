import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ATFullPrescritpion } from "../../_types"
import { employeesRoutes } from "../../_utils/routes"
import { formatDate, showHospitalName } from "@/lib/utils"

type Props = {
  prescription: Omit<ATFullPrescritpion, "_count">
}

export const AdminPrescriptionDetailsCard = ({ prescription }: Props) => {
  return (
    <Card className='relative h-fit'>
      <CardHeader>
        <CardTitle className='flex justify-between'>Prescription Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2'>
          <li className='flex gap-2 items-center justify-between'>
            <span>Hosptial</span>
            <Link
              className='text-blue-600 text-xs'
              href={employeesRoutes.hospitals.view(prescription.hospitalId)}
            >
              {showHospitalName(prescription.hospital)}
            </Link>
          </li>
          <li className='flex gap-2 items-center justify-between'>
            <span>Issued at</span>
            <span className='text-xs'>{formatDate(prescription.createdAt)}</span>
          </li>
          <li className='flex gap-2 items-center justify-between'>
            <span>Last update</span>
            <span className='text-xs'>{formatDate(prescription.updatedAt)}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
