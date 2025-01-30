import React from "react"
import AdminPageTitle from "@/app/dashboard/(helpers)/_components/common/title"

import db from "@/services/prisma"

import { resourcesIcons } from "@/lib/constants"
import { findPatient } from "@/app/dashboard/(helpers)/_actions/patients"
import { notFound } from "next/navigation"

import { PatientActionsDropdown } from "@/app/dashboard/(helpers)/_components/patients/patient-actions-dropdown"
import { PatientResourceBox } from "@/app/dashboard/(helpers)/_components/patients/resource-box"
import { PatientDetailsCard } from "@/app/dashboard/(helpers)/_components/patients/patient-details-card"
import { PatientNationalImageCard } from "@/app/dashboard/(helpers)/_components/patients/patient-national-image-card"
import { PatientBirthImageCard } from "@/app/dashboard/(helpers)/_components/patients/patient-birth-image-card"
import { employeesRoutes } from "@/app/dashboard/(helpers)/_utils/routes"

type Props = {
  params: { patientId: string }
}

export default async function PatientIdView({ params }: Props) {
  const patientId = +params.patientId
  const patient = await findPatient({ id: patientId })

  const counts = {
    prescriptions: await db.prescription.count({ where: { patientId } }),
    medications: await db.patientMedication.count({ where: { patientId } }),
    vaccinations: await db.patientVaccination.count({ where: { patientId } }),
    invoices: 0
  }

  if (!patient) return notFound()

  const pageTitle = (
    <span className='flex gap-2'>
      Patient -
      <b>
        {patient.name}#{patient.nationalId}
      </b>
    </span>
  )

  return (
    <div className='space-y-4'>
      <AdminPageTitle title={pageTitle}>
        <PatientActionsDropdown patient={patient} />
      </AdminPageTitle>
      <section>
        <h2 className='text-lg mb-2'>Patient Resources</h2>
        <section className='grid xl:grid-cols-5 grid-cols-1 gap-2'>
          <PatientResourceBox
            num={counts.prescriptions}
            label='Prescriptions'
            href={employeesRoutes.patients.patientPrescriptions(patientId)}
            image={resourcesIcons.prescriptions}
          />
          <PatientResourceBox
            num={counts.medications}
            label='Medications'
            href={employeesRoutes.patients.patientMedications(patientId)}
            image={resourcesIcons.medicine}
          />
          <PatientResourceBox
            num={counts.vaccinations}
            label='Vaccinations'
            href={employeesRoutes.patients.patientVaccinations(patientId)}
            image={resourcesIcons.vaccinations}
          />
        </section>
      </section>

      <section>
        <h2 className='text-lg mb-2'>Patient Data</h2>
        <section className='grid xl:grid-cols-3 grid-cols-1 gap-2'>
          <div className='flex flex-col gap-2'>
            <PatientDetailsCard patient={patient} />
            <PatientBirthImageCard imageURL={patient?.birthCertificateImage} />
          </div>
          <div className='col-span-2'>
            <PatientNationalImageCard imageURL={patient?.nationalIdImage} />
          </div>
        </section>
      </section>
    </div>
  )
}
