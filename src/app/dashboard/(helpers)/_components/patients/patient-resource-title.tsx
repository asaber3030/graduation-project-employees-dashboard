import Link from "next/link"

import { Patient } from "@prisma/client"
import { ChevronRight } from "lucide-react"

import { employeesRoutes } from "../../_utils/routes"

type Props = {
  patient: Patient
  resourceName: string
}

export const PatientResourceTitle = ({ patient, resourceName }: Props) => {
  return (
    <div className='flex gap-2 items-center'>
      <Link
        className='font-medium hover:underline hover:text-blue-500 block'
        href={employeesRoutes.patients.root}
      >
        Patients
      </Link>
      <ChevronRight size={20} />
      <Link
        className='font-semibold hover:underline hover:text-blue-500 block'
        href={employeesRoutes.patients.view(patient.id)}
      >
        {patient.name}#{patient.email}
      </Link>
      <ChevronRight size={20} />
      {resourceName}
    </div>
  )
}
