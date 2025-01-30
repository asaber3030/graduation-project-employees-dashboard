import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { AdminDoctorLoginHistory } from "@/app/dashboard/(helpers)/_components/doctors/login-history"
import { AdminDoctorDetailsCard } from "@/app/dashboard/(helpers)/_components/doctors/details-card"
import { SearchParams } from "@/types"
import { LinkBtn } from "@/components/common/link-btn"
import { Separator } from "@/components/ui/separator"
import { Book, Home, LogIn } from "lucide-react"
import { AdminDoctorPrintButton } from "@/app/dashboard/(helpers)/_components/doctors/print-button"

import { findDoctor, getLimitDoctorLoginHistory } from "@/app/dashboard/(helpers)/_actions/doctors"
import { notFound } from "next/navigation"
import { getDepartmentById } from "@/app/dashboard/(helpers)/_actions/departments"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"
import { getHospital } from "@/actions/app"
import { showHospitalName } from "@/lib/utils"

type Props = {
  params: {
    doctorId: string
  }
  searchParams: SearchParams
}

export default async function DoctorIdPage({ params }: Props) {
  const doctorId = +params.doctorId
  const doctor = await findDoctor({ id: doctorId })
  const department = await getDepartmentById(doctor?.departmentId as number)
  const hospital = await getHospital({ id: doctor?.hospitalId })

  if (!hospital || !doctor || !department) return notFound()

  const loginHistory = await getLimitDoctorLoginHistory(doctorId)

  const pageTitle = (
    <span className='flex gap-2 items-center'>
      Doctor -
      <b>
        {doctor.name} / {doctor.id}
      </b>
    </span>
  )

  return (
    <div className='space-y-4'>
      <AdminPageTitle title={pageTitle}>
        <AdminDoctorPrintButton />

        <LinkBtn href={employeesRoutes.doctors.update(doctor.id)} variant='blue'>
          Update
        </LinkBtn>

        <LinkBtn href={employeesRoutes.doctors.update(doctor.id)} variant='destructive'>
          Delete
        </LinkBtn>
      </AdminPageTitle>

      <section className='grid xl:grid-cols-3 grid-cols-1 gap-4'>
        <section className='col-span-2'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-lg font-medium'>Last 5 Login Times</p>
            <LinkBtn href={employeesRoutes.doctors.doctorLoginHistory(doctor.id)}>View All</LinkBtn>
          </div>

          <AdminDoctorLoginHistory loginHistory={loginHistory} />

          <Separator />

          <section className='print:hidden'>
            <p className='text-lg font-medium my-4'>Shortcuts</p>
            <section className='grid grid-cols-4 gap-2'>
              <Link
                href=''
                className='border flex gap-2 items-center rounded-md shadow-sm font-medium hover:border-primary transition-colors px-4 py-2'
              >
                <Home className='size-4' /> Appointments
              </Link>
              <Link
                href={employeesRoutes.doctors.doctorPrescriptions(doctor.id)}
                className='border flex gap-2 items-center rounded-md shadow-sm font-medium hover:border-primary transition-colors px-4 py-2'
              >
                <Book className='size-4' /> Prescriptions
              </Link>
              <Link
                href={employeesRoutes.doctors.doctorLoginHistory(doctor.id)}
                className='border flex gap-2 items-center rounded-md shadow-sm font-medium hover:border-primary transition-colors px-4 py-2'
              >
                <LogIn className='size-4' /> Login History
              </Link>
            </section>
          </section>
        </section>

        <section>
          <AdminDoctorDetailsCard doctor={doctor} department={department} />

          <p className='text-lg font-medium my-4'>Hospital</p>
          <Link
            href={employeesRoutes.hospitals.view(hospital.id)}
            className='border p-4 rounded-md flex items-center gap-4'
          >
            <Image
              src={hospital?.logo}
              width={40}
              height={40}
              alt='Doctor Avatar'
              className='hover:opacity-80'
            />

            <p className='text-lg font-medium hover:text-blue-600 hover:underline'>
              {showHospitalName(hospital)}
            </p>
          </Link>
        </section>
      </section>
    </div>
  )
}
