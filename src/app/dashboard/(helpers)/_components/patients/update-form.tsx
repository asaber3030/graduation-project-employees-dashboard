"use client"

import Link from "next/link"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { zodResolver } from "@hookform/resolvers/zod"
import { employeesRoutes } from "../../_utils/routes"
import { showResponseMessage } from "@/lib/utils"
import { updatePatientAction } from "../../_actions/patients"

import { PatientSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Patient } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SelectField } from "@/components/common/select-field"
import { SelectItem } from "@/components/ui/select"
import { DateField } from "@/components/common/date-field"

export const UpdatePatientForm = ({ patient }: { patient: Patient }) => {
  const form = useForm({
    resolver: zodResolver(PatientSchema.update),
    defaultValues: {
      name: patient.name,
      email: patient.email,
      phoneNumber: patient.phoneNumber,
      nationalId: patient.nationalId,
      emergencyContactName: patient.emergencyContactName,
      emergencyContactPhone: patient.emergencyContactPhone,
      allergies: patient.allergies,
      maritalStatus: patient.maritalStatus as any,
      gender: patient.gender as any,
      age: patient.age,
      birthDate: patient.birthDate
    }
  })

  const updateMutation = useMutation({
    mutationFn: () => updatePatientAction(patient.id, form.getValues() as any),
    onSuccess: (data) => showResponseMessage(data)
  })

  const handleUpdate = () => {
    updateMutation.mutate()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <InputField
            name='name'
            placeholder='Name'
            label='Name'
            control={form.control}
            defaultValue={patient.name}
          />
          <InputField
            name='email'
            placeholder='Email'
            label='E-mail Address'
            defaultValue={patient.email}
            control={form.control}
          />
        </div>

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <InputField
            name='phoneNumber'
            placeholder='Phone'
            label='Phone Number'
            defaultValue={patient.phoneNumber}
            control={form.control}
          />

          <InputField
            name='nationalId'
            placeholder='National ID'
            label='National ID'
            defaultValue={patient.nationalId}
            control={form.control}
          />
        </div>

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <InputField
            name='emergencyContactName'
            placeholder='Emergency Contact Name'
            label='Emergency Contact Name'
            defaultValue={patient.emergencyContactName}
            control={form.control}
          />
          <InputField
            name='emergencyContactPhone'
            placeholder='Emergency Contact Phone'
            label='Emergency Contact Phone'
            defaultValue={patient.emergencyContactPhone}
            control={form.control}
          />
        </div>

        <InputField
          name='allergies'
          placeholder='Allergies'
          label='Allergies'
          defaultValue={patient.allergies}
          control={form.control}
        />

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <SelectField
            name='gender'
            label='Gender'
            control={form.control}
            defaultValue={patient.gender}
          >
            <SelectItem value='Male'>Male</SelectItem>
            <SelectItem value='Female'>Female</SelectItem>
          </SelectField>

          <SelectField
            name='maritalStatus'
            label='Marital Status'
            control={form.control}
            defaultValue={patient.maritalStatus as string}
          >
            <SelectItem value='Single'>Single</SelectItem>
            <SelectItem value='Married'>Married</SelectItem>
          </SelectField>
        </div>

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4 items-center'>
          <DateField
            name='birthDate'
            label='Birth Date'
            control={form.control}
            defaultValue={patient.birthDate as Date}
          />
          <InputField name='age' placeholder='Age' label='Age' control={form.control} />
        </div>

        <div className='flex gap-2'>
          <LoadingButton variant='blue' loading={updateMutation.isPending}>
            Update
          </LoadingButton>
          <Link href={employeesRoutes.patients.root}>
            <Button variant='outline'>Cancel</Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}
