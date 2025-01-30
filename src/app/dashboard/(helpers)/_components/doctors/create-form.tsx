"use client"

import Link from "next/link"
import React from "react"

import { useSearchDepartments } from "../../_hooks/useDepartment"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { showResponseMessage } from "@/lib/utils"
import { createDoctorAction } from "../../_actions/doctors"
import { zodResolver } from "@hookform/resolvers/zod"
import { employeesRoutes } from "../../_utils/routes"
import { z } from "zod"

import { LoadingButton } from "@/components/common/loading-button"
import { ArrowRight, Loader2 } from "lucide-react"
import { DoctorSchema } from "@/schema"
import { InputField } from "@/components/common/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { CommandItem } from "@/components/ui/command"
import { SearchBox } from "@/components/common/search-box"
import { ActiveCheckIcon } from "@/components/common/active-check-icon"

type Mutation = {
  data: z.infer<typeof DoctorSchema.create>
  departmentId: number
}

export const AdminCreateDoctorForm = () => {
  const form = useForm({
    resolver: zodResolver(DoctorSchema.create)
  })

  const [searchValue, setSearchValue] = useState("")
  const [selectedDepartmentName, setSelectedSelecetedName] = useState("")
  const [departmentId, setDepartmentId] = useState(0)

  const { departments, isDepartmentsLoading, refetchDepartments } =
    useSearchDepartments(searchValue)

  const createMutation = useMutation({
    mutationFn: ({ departmentId, data }: Mutation) =>
      createDoctorAction(departmentId, form.getValues() as any),
    onSuccess: (data) => showResponseMessage(data)
  })

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelectedSelecetedName(currentValue)
    setDepartmentId(id)
  }

  const handleCreate = () => {
    createMutation.mutate({
      data: form.getValues() as any,
      departmentId: departmentId
    })
  }

  useEffect(() => {
    refetchDepartments()
  }, [searchValue])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
        <section>
          <Label>Select Department</Label>
          <SearchBox
            value={selectedDepartmentName}
            buttonClassName='w-full'
            setValue={setSearchValue}
          >
            {isDepartmentsLoading ? (
              <div className='flex items-center justify-center'>
                <Loader2 className='animate-spin' />
              </div>
            ) : (
              <>
                {departments?.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={String(item.name + "#" + item.id)}
                    onSelect={(currentValue) => onCommandSelect(currentValue, item.id)}
                  >
                    <ActiveCheckIcon
                      active={selectedDepartmentName === item.name + "#" + item.id}
                    />
                    {item.name} - ID <ArrowRight className='size-4' /> <b>{item.id}</b>
                  </CommandItem>
                ))}
              </>
            )}
          </SearchBox>
        </section>

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
          name='password'
          placeholder='Password'
          label='Password'
          type='password'
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
          <LoadingButton variant='success' loading={createMutation.isPending}>
            Create
          </LoadingButton>
          <Link href={employeesRoutes.doctors.root}>
            <Button variant='outline'>Cancel</Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}
