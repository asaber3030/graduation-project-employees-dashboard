import Link from "next/link"
import Image from "next/image"

import { Department, Doctor } from "@prisma/client"

import { userImagePlaceholder } from "@/lib/constants"
import { employeesRoutes } from "../../_utils/routes"
import { formatDate } from "@/lib/utils"

type Props = {
  doctor: Doctor
  department: Department
}

export const AdminDoctorDetailsCard = ({ doctor, department }: Props) => {
  return (
    <section className='rounded-md h-fit'>
      <p className='text-lg font-medium mb-4'>Doctor Details</p>
      <div className='border p-4 pb-4 rounded-md'>
        <div className='flex items-center gap-4 mb-4 border-b pb-4'>
          <Image
            src={doctor?.image ?? userImagePlaceholder}
            width={50}
            height={50}
            alt='Doctor Avatar'
            className='rounded-md'
          />
          <div>
            <p>{doctor.name}</p>
            <p className='text-xs text-gray-500'>@{doctor.username}</p>
          </div>
        </div>

        <ul className='space-y-2'>
          <li className='flex justify-between items-center'>
            <span>Email</span>
            <span>{doctor.email}</span>
          </li>

          <li className='flex justify-between items-center'>
            <span>Job Title</span>
            <span>{doctor.jobTitle}</span>
          </li>

          <li className='flex justify-between items-center'>
            <span>Department</span>
            <Link
              href={employeesRoutes.departments.view(doctor.departmentId)}
              className='text-blue-500 hover:underline'
            >
              Department - <b>{department?.name}</b>
            </Link>
          </li>

          <li className='flex justify-between items-center'>
            <span>Phone Number</span>
            <span>{doctor.phoneNumber}</span>
          </li>

          <li className='flex justify-between items-center'>
            <span>Created at</span>
            <span>{formatDate(doctor.createdAt)}</span>
          </li>

          <li className='flex justify-between items-center'>
            <span>Last Update</span>
            <span>{formatDate(doctor.updatedAt)}</span>
          </li>
        </ul>
      </div>
    </section>
  )
}
