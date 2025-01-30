"use client"

import React from "react"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { showResponseMessage } from "@/lib/utils"
import { updateAdminAction } from "../../_actions/admin"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Admin } from "@prisma/client"

type Mutation = {
  data: z.infer<typeof AdminSchema.update>
}

type Props = {
  children: React.ReactNode
  admin: Admin
}

export const AdminUpdateAdminModal = ({ children, admin }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(AdminSchema.update),
    defaultValues: admin,
  })

  const updateMutation = useMutation({
    mutationFn: ({ data }: Mutation) => updateAdminAction(admin.id, data),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        form.reset()
        setOpen(false)
      }),
  })

  const handleUpdate = () => {
    updateMutation.mutate({
      data: form.getValues() as any,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Admin - <b>{admin.name}</b>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
            <InputField name="name" placeholder="Name" label="Name" control={form.control} />

            <InputField
              name="email"
              placeholder="Email"
              label="E-mail Address"
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
                <LoadingButton variant="blue" loading={updateMutation.isPending}>
                  Update
                </LoadingButton>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
