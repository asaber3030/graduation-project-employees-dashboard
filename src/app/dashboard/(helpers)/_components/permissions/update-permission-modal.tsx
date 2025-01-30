"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import React, { useState } from "react"

import { showResponseMessage } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { PermissionSchema } from "@/schema"
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
import { updatePermissionAction } from "../../_actions/permissions"
import { toast } from "sonner"
import { ResourcePermission } from "@prisma/client"

type Props = {
  children: React.ReactNode
  asChild?: boolean
  permission: ResourcePermission
}

type Mutation = {
  data: z.infer<typeof PermissionSchema.update>
}

export const AdminUpdatePermissionModal = ({ asChild, children, permission }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(PermissionSchema.create),
    defaultValues: {
      permissionName: permission.permissionName,
      permissionCode: permission.permissionCode,
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ data }: Mutation) => updatePermissionAction(permission.id, data),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        setOpen(false)
        form.reset()
      }),
  })

  const handleGenerateGroupCode = () => {
    if (!form.getValues().permissionName) {
      toast.error("Please enter a permission name first.")
      return
    }
    form.setValue(
      "permissionCode",
      form.getValues().permissionName.toLowerCase().replace(/\s/g, "_") +
        "_permission_" +
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
            Update Permission - <b>{permission.permissionCode}</b>
          </DialogTitle>
          <DialogDescription>Update Permission parameters: (Name, Code).</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
            <InputField
              name="permissionName"
              label="Permission Name"
              placeholder="Permission Name"
              control={form.control}
            />
            <InputField
              name="permissionCode"
              label="Permission Code"
              placeholder="Permission Code"
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
