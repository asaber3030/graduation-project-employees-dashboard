"use client"

import React from "react"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { updateInventoryAction } from "../../_actions/inventories"
import { showResponseMessage } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { employeesRoutes } from "../../_utils/routes"
import { z } from "zod"

import { ATFullInventory } from "../../_types"
import { InventorySchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { LinkBtn } from "@/components/common/link-btn"
import { Form } from "@/components/ui/form"

type Mutation = {
  data: z.infer<typeof InventorySchema.update>
}

type Props = {
  inventory: ATFullInventory
}

export const AdminUpdateInventtoryForm = ({ inventory }: Props) => {
  const form = useForm({
    resolver: zodResolver(InventorySchema.update),
    defaultValues: {
      name: inventory.name,
      description: inventory.description,
      code: inventory.code
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ data }: Mutation) => updateInventoryAction(inventory.id, data),
    onSuccess: (data) => showResponseMessage(data)
  })

  const handleSubmit = () => {
    updateMutation.mutate({ data: form.getValues() })
    console.log(form.getValues())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
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
          <LoadingButton type='submit' loading={updateMutation.isPending} variant='success'>
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
