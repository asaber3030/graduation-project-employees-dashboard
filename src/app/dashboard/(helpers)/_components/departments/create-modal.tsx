"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useState } from "react"

import { createDepartmentAction } from "../../_actions/departments"
import { showResponseMessage } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { DepartmentSchema } from "@/schema"
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
  data: z.infer<typeof DepartmentSchema.create>
}

export const AdminCreateDepartmentModal = ({ asChild, children }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(DepartmentSchema.create),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const createMutation = useMutation({
    mutationFn: ({ data }: Mutation) => createDepartmentAction(data),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        setOpen(false)
        form.reset()
      }),
  })

  const handleSubmit = () => {
    createMutation.mutate({ data: form.getValues() })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Department</DialogTitle>
          <DialogDescription>
            Create Department information, It's assigned to current selected hospital
          </DialogDescription>
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
