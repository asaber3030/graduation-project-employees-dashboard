"use client"

import Link from "next/link"
import React from "react"

import { useSearchDepartments } from "../../_hooks/useDepartment"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useState } from "react"

import { updateEmployeeAction } from "../../_actions/employees"
import { showResponseMessage } from "@/lib/utils"
import { employeesRoutes } from "../../_utils/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { EmployeeSchema } from "@/schema"
import { FilterBySearch } from "@/components/common/filter-by-search"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ATFullEmployee } from "../../_types"

type Mutation = {
  data: z.infer<typeof EmployeeSchema.update>
  departmentId: number
}

type Props = {
  employee: ATFullEmployee
}

export const AdminUpdateEmployeeForm = ({ employee }: Props) => {
  const form = useForm({
    resolver: zodResolver(EmployeeSchema.update),
    defaultValues: {
      name: employee.name,
      username: employee.username,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      jobTitle: employee.jobTitle
    }
  })

  const [searchValue, setSearchValue] = useState("")
  const [selectedDepartmentName, setSelectedSelecetedName] = useState(
    employee.department.name + "#" + employee.department.id
  )
  const [departmentId, setDepartmentId] = useState(employee.departmentId)

  const { departments, isDepartmentsLoading, refetchDepartments } =
    useSearchDepartments(searchValue)

  const departmentsValues = departments?.map((dep) => ({
    id: dep.id,
    label: dep.name,
    value: dep.name + "#" + dep.id
  }))

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelectedSelecetedName(currentValue)
    setDepartmentId(id)
  }

  const updateMutation = useMutation({
    mutationFn: ({ departmentId, data }: Mutation) =>
      updateEmployeeAction(employee.id, departmentId, data),
    onSuccess: (data) => showResponseMessage(data)
  })

  const handleUpdate = () => {
    updateMutation.mutate({
      data: form.getValues() as z.infer<typeof EmployeeSchema.create>,
      departmentId
    })
  }

  useEffect(() => {
    refetchDepartments()
  }, [searchValue])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)} className='space-y-4'>
        <FilterBySearch
          value={selectedDepartmentName}
          setValue={setSearchValue}
          isLoading={isDepartmentsLoading}
          onCommandSelect={onCommandSelect}
          data={departmentsValues}
        />

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

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <InputField
            name='phoneNumber'
            placeholder='Phone'
            label='Phone Number'
            control={form.control}
          />

          <InputField
            name='jobTitle'
            placeholder='Job Title'
            label='Job Title'
            control={form.control}
          />
        </div>

        <div className='flex gap-2'>
          <LoadingButton variant='blue' loading={updateMutation.isPending}>
            Update
          </LoadingButton>

          <Link href={employeesRoutes.employees.root}>
            <Button variant='outline'>Cancel</Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}
