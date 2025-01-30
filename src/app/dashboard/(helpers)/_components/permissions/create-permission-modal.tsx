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
import { createPermissionAction } from "../../_actions/permissions"
import { usePermissionGroup } from "../../_hooks/usePermissionFetch"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { toast } from "sonner"

type Props = {
  children: React.ReactNode
  asChild?: boolean
  groupId: number
}

type Mutation = {
  data: z.infer<typeof PermissionSchema.create>
  groupId: number
}

export const AdminCreatePermissionModal = ({ asChild, children, groupId }: Props) => {
  const [open, setOpen] = useState(false)

  const { group, isGroupLoading, isGroupError } = usePermissionGroup(groupId)

  const form = useForm({
    resolver: zodResolver(PermissionSchema.create),
    defaultValues: {
      permissionName: "",
      permissionCode: "",
    },
  })

  const createMutation = useMutation({
    mutationFn: ({ data, groupId }: Mutation) => createPermissionAction(groupId, data),
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
    createMutation.mutate({ data: form.getValues(), groupId })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Permission</DialogTitle>
          <DialogDescription>
            Create Permission and assigning it to the selected group.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
            {isGroupLoading && <LoadingSpinner />}
            {isGroupError && <p>Error loading group.</p>}
            <InputField
              name="groupId"
              label="Selected Permission Group"
              defaultValue={group?.groupName}
              disabled
              control={form.control}
            />

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
