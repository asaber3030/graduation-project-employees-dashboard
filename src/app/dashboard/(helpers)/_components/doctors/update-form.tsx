"use client"

import Link from "next/link"
import React from "react"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { showResponseMessage } from "@/lib/utils"
import { updateDoctorAction } from "../../_actions/doctors"
import { zodResolver } from "@hookform/resolvers/zod"
import { employeesRoutes } from "../../_utils/routes"
import { z } from "zod"

import { DoctorSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Doctor } from "@prisma/client"

type Mutation = {
  data: z.infer<typeof DoctorSchema.update>
}

type Props = {
  doctor: Doctor
}

export const AdminUpdateDoctorForm = ({ doctor }: Props) => {
  const form = useForm({
    resolver: zodResolver(DoctorSchema.update),
    defaultValues: doctor
  })

  const updateMutation = useMutation({
    mutationFn: ({ data }: Mutation) => updateDoctorAction(doctor.id, data),
    onSuccess: (data) => showResponseMessage(data)
  })

  const handleCreate = () => {
    updateMutation.mutate({
      data: form.getValues() as any
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <InputField name='name' placeholder='Name' label='Name' control={form.control} />
          <InputField
            name='username'
            placeholder='Username'
            label='Username'
            control={form.control}
          />
        </div>

        <InputField
          name='email'
          placeholder='Email'
          label='E-mail Address'
          control={form.control}
        />

        <InputField
          name='jobTitle'
          placeholder='Job title'
          label='Job title'
          control={form.control}
        />

        <InputField
          name='phoneNumber'
          placeholder='Phone'
          label='Phone Number'
          control={form.control}
        />

        <div className='flex gap-2'>
          <LoadingButton variant='blue' loading={updateMutation.isPending}>
            Update
          </LoadingButton>
          <Link href={employeesRoutes.doctors.root}>
            <Button variant='outline'>Cancel</Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}
