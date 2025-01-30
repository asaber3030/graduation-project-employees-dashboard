"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import React, { useState } from "react"

import { updatePermissionGroupAction } from "../../_actions/permissions-groups"
import { showResponseMessage } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { z } from "zod"

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
import { ATFullPermissionGroup } from "../../_types"

type Props = {
  group: ATFullPermissionGroup
  children: React.ReactNode
  asChild?: boolean
}

type Mutation = {
  data: z.infer<typeof PermissionGroupSchema.update>
}

export const AdminUpdatePermissionGroupModal = ({ group, asChild, children }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(PermissionGroupSchema.update),
    defaultValues: {
      groupName: group.groupName,
      groupCode: group.groupCode,
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ data }: Mutation) => updatePermissionGroupAction(group.id, data),
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
    updateMutation.mutate({ data: form.getValues() })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Permission Group - <b>{group.groupName}</b>
          </DialogTitle>
          <DialogDescription>Update Permission Group Details.</DialogDescription>
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
                <LoadingButton type="submit" loading={updateMutation.isPending} variant="blue">
                  Update
                </LoadingButton>
              </section>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
