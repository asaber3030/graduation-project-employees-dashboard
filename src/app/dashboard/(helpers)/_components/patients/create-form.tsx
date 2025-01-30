"use client"

import Link from "next/link"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { zodResolver } from "@hookform/resolvers/zod"
import { employeesRoutes } from "../../_utils/routes"
import { showResponseMessage } from "@/lib/utils"
import { createPatientAction } from "../../_actions/patients"

import { PatientSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SelectField } from "@/components/common/select-field"
import { SelectItem } from "@/components/ui/select"
import { DateField } from "@/components/common/date-field"

export const CreatePatientForm = () => {
  const form = useForm({
    resolver: zodResolver(PatientSchema.create)
  })

  const createMutation = useMutation({
    mutationFn: () => createPatientAction(form.getValues() as any),
    onSuccess: (data) => showResponseMessage(data)
  })

  const handleCreate = () => {
    createMutation.mutate()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <InputField name='name' placeholder='Name' label='Name' control={form.control} />
          <InputField
            name='email'
            placeholder='Email'
            label='E-mail Address'
            control={form.control}
          />
        </div>

        <InputField
          name='password'
          placeholder='Password'
          label='Password'
          type='password'
          control={form.control}
        />

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <InputField
            name='phoneNumber'
            placeholder='Phone'
            label='Phone Number'
            control={form.control}
          />

          <InputField
            name='nationalId'
            placeholder='National ID'
            label='National ID'
            control={form.control}
          />
        </div>

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <InputField
            name='emergencyContactName'
            placeholder='Emergency Contact Name'
            label='Emergency Contact Name'
            control={form.control}
          />
          <InputField
            name='emergencyContactPhone'
            placeholder='Emergency Contact Phone'
            label='Emergency Contact Phone'
            control={form.control}
          />
        </div>

        <InputField
          name='allergies'
          placeholder='Allergies'
          label='Allergies'
          control={form.control}
        />

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <SelectField name='gender' label='Gender' control={form.control}>
            <SelectItem value='Male'>Male</SelectItem>
            <SelectItem value='Female'>Female</SelectItem>
          </SelectField>

          <SelectField name='maritalStatus' label='Marital Status' control={form.control}>
            <SelectItem value='Single'>Single</SelectItem>
            <SelectItem value='Married'>Married</SelectItem>
          </SelectField>
        </div>

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4 items-center'>
          <DateField name='birthDate' label='Birth Date' control={form.control} />
          <InputField name='age' placeholder='Age' label='Age' control={form.control} />
        </div>

        <div className='flex gap-2'>
          <LoadingButton variant='success' loading={createMutation.isPending}>
            Create
          </LoadingButton>
          <Link href={employeesRoutes.patients.root}>
            <Button variant='outline'>Cancel</Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}
