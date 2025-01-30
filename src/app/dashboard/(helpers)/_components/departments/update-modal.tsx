"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useState } from "react"

import { showResponseMessage } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateDepartmentAction } from "../../_actions/departments"
import { z } from "zod"

import { DepartmentSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Department } from "@prisma/client"
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

type Props = {
  department: Department
  children: React.ReactNode
  asChild?: boolean
}

type Mutation = {
  data: z.infer<typeof DepartmentSchema.update>
}

export const AdminUpdateDepartmentModal = ({ asChild, department, children }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(DepartmentSchema.update),
    defaultValues: {
      name: department.name,
      description: department.description,
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ data }: Mutation) => updateDepartmentAction(department.id, data),
    onSuccess: (data) => showResponseMessage(data, () => setOpen),
  })

  const handleSubmit = () => {
    updateMutation.mutate({ data: form.getValues() })
    console.log(form.getValues())
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Department details</DialogTitle>
          <DialogDescription>Update department information</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
            <InputField name="name" label="Name" placeholder="Enter Name" control={form.control} />
            <InputField
              name="description"
              label="Description"
              placeholder="Enter Description"
              isTextarea
              control={form.control}
            />
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
