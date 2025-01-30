"use client"

import React from "react"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { quickAssignPermissionAction } from "../../_actions/permissions"
import { showResponseMessage } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { EmployeePermissionSchema } from "@/schema"
import { ResourcePermission } from "@prisma/client"
import { LoadingButton } from "@/components/common/loading-button"
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { InputField } from "@/components/common/input-field"

type Props = {
  permission: ResourcePermission
  children: React.ReactNode
  asChild?: boolean
}

type Mutation = {
  data: z.infer<typeof EmployeePermissionSchema.quickAssign>
  permissionId: number
}

export const AdminQuickAssignPermissionToEmployeeModal = ({
  permission,
  asChild,
  children,
}: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(EmployeePermissionSchema.quickAssign),
    defaultValues: {
      employeeEmail: "",
    },
  })

  const createMutation = useMutation({
    mutationFn: ({ data, permissionId }: Mutation) =>
      quickAssignPermissionAction(permissionId, data),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        form.reset()
        setOpen(false)
      }),
  })

  const handleSubmit = () => {
    createMutation.mutate({ data: form.getValues(), permissionId: permission.id })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Permission</DialogTitle>
          <DialogDescription>
            Assigning this permission will give the employee access to the selected permission.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
            <InputField
              control={form.control}
              label="Employee Email"
              name="employeeEmail"
              placeholder="Employee Email"
              type="email"
            />

            <DialogFooter>
              <section className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <LoadingButton type="submit" loading={createMutation.isPending} variant="success">
                  Assign
                </LoadingButton>
              </section>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
