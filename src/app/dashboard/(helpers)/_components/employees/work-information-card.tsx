"use client"

import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Hospital } from "lucide-react"
import { ATFullEmployee } from "../../_types"
import { Label } from "@/components/ui/label"

import { showHospitalName } from "@/lib/utils"
import { employeesRoutes } from "../../_utils/routes"

type Props = {
  employee: ATFullEmployee
}

export default function AdminEmployeeWorkInformationCard({ employee }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Information</CardTitle>
      </CardHeader>

      <CardContent className='grid gap-1'>
        <div className='flex items-center gap-2'>
          <Building2 className='w-4 h-4 opacity-70' />
          <Label>Department:</Label>
          <Link
            className='text-blue-500 hover:underline'
            href={employeesRoutes.departments.view(employee.departmentId)}
          >
            {employee.department.name}
          </Link>
        </div>
        <div className='flex items-center gap-2'>
          <Hospital className='w-4 h-4 opacity-70' />
          <Label>Hospital:</Label>
          <Link
            className='text-blue-500 hover:underline'
            href={employeesRoutes.hospitals.view(employee.hospitalId)}
          >
            {showHospitalName(employee.hospital)}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
