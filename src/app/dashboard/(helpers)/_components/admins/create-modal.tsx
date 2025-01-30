"use client"

import React from "react"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { showResponseMessage } from "@/lib/utils"
import { createAdminAction } from "../../_actions/admin"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { LoadingButton } from "@/components/common/loading-button"
import { AdminSchema } from "@/schema"
import { InputField } from "@/components/common/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

type Mutation = {
  data: z.infer<typeof AdminSchema.create>
}

type Props = {
  children: React.ReactNode
}

export const AdminCreateAdminModal = ({ children }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(AdminSchema.create)
  })

  const createMutation = useMutation({
    mutationFn: ({ data }: Mutation) => createAdminAction(data),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        form.reset()
        setOpen(false)
      })
  })

  const handleCreate = () => {
    createMutation.mutate({
      data: form.getValues() as any
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Admin</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
            <InputField name="name" placeholder="Name" label="Name" control={form.control} />

            <InputField
              name="email"
              placeholder="Email"
              label="E-mail Address"
              control={form.control}
            />

            <InputField
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
              control={form.control}
            />

            <InputField
              name="phoneNumber"
              placeholder="Phone"
              label="Phone Number"
              control={form.control}
            />

            <DialogFooter>
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <LoadingButton variant="success" loading={createMutation.isPending}>
                  Create
                </LoadingButton>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
