"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import React, { useState } from "react"

import { createInventoryAction } from "../../_actions/inventories"
import { useSearchDepartments } from "../../_hooks/useDepartment"
import { showResponseMessage } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { InventorySchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { CommandItem } from "@/components/ui/command"
import { ArrowRight, Loader2 } from "lucide-react"
import { SearchBox } from "@/components/common/search-box"
import { ActiveCheckIcon } from "@/components/common/active-check-icon"
import { LinkBtn } from "@/components/common/link-btn"
import { employeesRoutes } from "../../_utils/routes"

type Mutation = {
  data: z.infer<typeof InventorySchema.create>
}

export const AdminCreateInventtoryModal = () => {
  const [searchValue, setSearchValue] = useState("")
  const [selectedDepartmentName, setSelectedSelecetedName] = useState("")
  const [departmentId, setDepartmentId] = useState(0)

  const { departments, isDepartmentsLoading, refetchDepartments } =
    useSearchDepartments(searchValue)

  const form = useForm({
    resolver: zodResolver(InventorySchema.create),
    defaultValues: {
      name: "",
      description: "",
      code: ""
    }
  })

  const createMutation = useMutation({
    mutationFn: ({ data }: Mutation) => createInventoryAction(departmentId, data),
    onSuccess: (data) => showResponseMessage(data)
  })

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelectedSelecetedName(currentValue)
    setDepartmentId(id)
  }

  const handleSubmit = () => {
    createMutation.mutate({ data: form.getValues() })
  }

  useEffect(() => {
    refetchDepartments()
  }, [searchValue])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
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

        <InputField name='code' label='Code' placeholder='Code' control={form.control} />
        <InputField name='name' label='Name' placeholder='Enter Name' control={form.control} />
        <InputField
          name='description'
          label='Description'
          placeholder='Enter Description'
          isTextarea
          control={form.control}
        />

        <section className='flex gap-2'>
          <LoadingButton type='submit' loading={createMutation.isPending} variant='success'>
            Create
          </LoadingButton>
          <LinkBtn variant='outline' type='button' href={employeesRoutes.inventories.root}>
            Close
          </LinkBtn>
        </section>
      </form>
    </Form>
  )
}
