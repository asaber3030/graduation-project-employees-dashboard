import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Patient } from "@prisma/client"
import { LinkBtn } from "@/components/common/link-btn"
import { Eye } from "lucide-react"

import { userImagePlaceholder } from "@/lib/constants"
import { employeesRoutes } from "../../_utils/routes"

type Props = {
  patient: Patient
}

export const AdminPrescriptionPatientCard = ({ patient }: Props) => {
  return (
    <Card className='relative'>
      <CardHeader>
        <CardTitle className='flex justify-between'>Patient</CardTitle>
      </CardHeader>
      <CardContent>
        <LinkBtn
          className='absolute bottom-2 right-2 print:hidden'
          variant='outline'
          href={employeesRoutes.patients.view(patient.id)}
          icon={Eye}
        >
          View
        </LinkBtn>

        <div className='flex gap-4 items-center'>
          <Avatar className='size-12'>
            <AvatarImage src={userImagePlaceholder} alt='Doctor' />
            <AvatarFallback>{patient?.name?.[0] ?? "G"}</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-lg font-bold'>{patient.name}</p>
            <Link href={employeesRoutes.doctors.view(patient.id)} className='text-blue-600 text-xs'>
              {patient.email}
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
