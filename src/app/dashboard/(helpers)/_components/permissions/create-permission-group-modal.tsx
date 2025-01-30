"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import React, { useState } from "react"

import { showResponseMessage } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { createPermissionGroupAction } from "../../_actions/permissions-groups"

import { PermissionGroupSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Form } from "@/components/ui/form"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Props = {
  children: React.ReactNode
  asChild?: boolean
}

type Mutation = {
  data: z.infer<typeof PermissionGroupSchema.create>
}

export const AdminCreatePermissionGroupModal = ({ asChild, children }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(PermissionGroupSchema.create),
    defaultValues: {
      groupName: "",
      groupCode: "",
    },
  })

  const createMutation = useMutation({
    mutationFn: ({ data }: Mutation) => createPermissionGroupAction(data),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        setOpen(false)
        form.reset()
      }),
  })

  const handleGenerateGroupCode = () => {
    if (!form.getValues().groupName) {
      toast.error("Please enter a group name first.")
      return
    }
    form.setValue(
      "groupCode",
      form.getValues().groupName.toLowerCase().replace(/\s/g, "_") +
        "_permission_group_" +
        Math.floor(Math.random() * 1000)
    )
  }

  const handleSubmit = () => {
    createMutation.mutate({ data: form.getValues() })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Permission Group</DialogTitle>
          <DialogDescription>Create Permission Group.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
            <InputField
              name="groupName"
              label="Group Name"
              placeholder="Group Name"
              control={form.control}
            />
            <InputField
              name="groupCode"
              label="Group Code"
              placeholder="Group Code"
              control={form.control}
            />
            <Button type="button" variant="link" onClick={handleGenerateGroupCode}>
              Generate code
            </Button>

            <DialogFooter>
              <section className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <LoadingButton type="submit" loading={createMutation.isPending} variant="success">
                  Create
                </LoadingButton>
              </section>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
