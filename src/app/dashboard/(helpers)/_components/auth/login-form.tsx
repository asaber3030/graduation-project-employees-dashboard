"use client"

import { useHospitals } from "@/hooks/useHospitals"
import { useRouter } from "next/navigation"
import { useLogin } from "@/hooks/useLogin"
import { useForm } from "react-hook-form"

import { showResponseMessage } from "@/lib/utils"
import { employeesRoutes } from "../../_utils/routes"
import { zodResolver } from "@hookform/resolvers/zod"

import { APIResponse } from "@/types"
import { LoginSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckboxField } from "@/components/common/checkbox-field"
import { SelectField } from "@/components/common/select-field"
import { InputField } from "@/components/common/input-field"
import { SelectItem } from "@/components/ui/select"
import { Form } from "@/components/ui/form"

export const AdminLoginForm = () => {
  const { hospitals, isHospitalsLoading } = useHospitals()
  const { push } = useRouter()

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "a@a.com",
      password: "0552320541",
      rememberMe: false,
      hospitalId: 1
    }
  })

  const login = useLogin((data: APIResponse<any, any>) => {
    showResponseMessage(data)
    push(employeesRoutes.dashboard.root)
    console.log(data)
  })

  const handleLogin = () => {
    login.mutateLogin({
      data: form.getValues(),
      rememberMe: !!form.getValues("rememberMe")
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className='space-y-4'>
        {isHospitalsLoading ? (
          <Skeleton className='w-full h-8' />
        ) : (
          <SelectField
            control={form.control}
            label='Hospital'
            name='hospitalId'
            placeholder='Which Hospital?'
            valueAsNumber
          >
            {hospitals?.map((hospital) => (
              <SelectItem key={`hospital-item-${hospital.id}`} value={String(hospital.id)}>
                {hospital.name} - {hospital.location}
              </SelectItem>
            ))}
          </SelectField>
        )}

        <InputField name='email' placeholder='Email Address' control={form.control} label='Email' />

        <InputField
          name='password'
          placeholder='Password'
          control={form.control}
          label='Password'
          type='password'
        />

        <CheckboxField name='rememberMe' control={form.control} label='Remember me?' />

        <LoadingButton className='w-full' loading={login.loginPending}>
          Login
        </LoadingButton>
      </form>
    </Form>
  )
}
