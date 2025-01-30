import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Doctor } from "@prisma/client"
import { LinkBtn } from "@/components/common/link-btn"
import { Eye } from "lucide-react"

import { userImagePlaceholder } from "@/lib/constants"
import { employeesRoutes } from "../../_utils/routes"

type Props = {
  doctor: Doctor
}

export const AdminPrescriptionDoctorCard = ({ doctor }: Props) => {
  return (
    <Card className='relative'>
      <CardHeader>
        <CardTitle className='flex justify-between'>Doctor</CardTitle>
      </CardHeader>
      <CardContent>
        <LinkBtn
          className='absolute bottom-2 right-2 print:hidden'
          href={employeesRoutes.doctors.view(doctor.id)}
          icon={Eye}
        >
          View
        </LinkBtn>

        <div className='flex gap-4 items-center'>
          <Avatar className='size-12'>
            <AvatarImage src={userImagePlaceholder} alt='Doctor' />
            <AvatarFallback>{doctor?.name?.[0] ?? "G"}</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-lg font-bold'>Dr. {doctor.name}</p>
            <Link href={employeesRoutes.doctors.view(doctor.id)} className='text-blue-600 text-xs'>
              @{doctor.username}
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
