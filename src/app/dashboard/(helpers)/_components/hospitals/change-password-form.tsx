"use client"

import Link from "next/link"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { changeHospitalPasswordAction } from "../../_actions/hospitals"
import { showResponseMessage } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { employeesRoutes } from "../../_utils/routes"

import { HospitalSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Hospital } from "@prisma/client"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import * as z from "zod"

type Mutation = {
  data: z.infer<typeof HospitalSchema.changePassword>
}

export const UpdateHospitalPasswordForm = ({ hospital }: { hospital: Hospital }) => {
  const form = useForm({
    resolver: zodResolver(HospitalSchema.changePassword),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmationPassword: ""
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ data }: Mutation) => changeHospitalPasswordAction(hospital.id, data),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        if (data.status == 200) {
          form.reset()
        }
      })
  })

  const handleUpdate = () => {
    updateMutation.mutate({ data: form.getValues() })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
        <InputField name='currentPassword' placeholder='Current Password' label='Current Password' type='password' control={form.control} />
        <InputField name='newPassword' placeholder='New Password' label='New Password' type='password' control={form.control} />
        <InputField name='confirmationPassword' placeholder='Confirmation Password' label='Confirmation Password' type='password' control={form.control} />

        <div className='flex gap-2'>
          <LoadingButton variant='blue' loading={updateMutation.isPending}>
            Update Password
          </LoadingButton>
          <Link href={employeesRoutes.hospitals.root}>
            <Button variant='outline'>Cancel</Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}
