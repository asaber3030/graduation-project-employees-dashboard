"use client"

import Link from "next/link"

import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { updateHospitalAction } from "../../_actions/hospitals"
import { adminRoutes } from "../../_utils/routes"
import { showResponseMessage } from "@/lib/utils"

import { HospitalSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Hospital } from "@prisma/client"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { FileField } from "@/components/common/file-field"
import { FileIcon } from "lucide-react"
import { z } from "zod"

type Mutation = {
  data: z.infer<typeof HospitalSchema.update>
  formData?: FormData
}

export const UpdateHospitalForm = ({ hospital }: { hospital: Hospital }) => {
  const [file, setFile] = useState<File | undefined>(undefined)

  const form = useForm({
    resolver: zodResolver(HospitalSchema.update),
    defaultValues: {
      name: hospital.name,
      description: hospital.description,
      location: hospital.location,
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ data, formData }: Mutation) => updateHospitalAction(hospital.id, data, formData),
    onSuccess: (data) => showResponseMessage(data),
  })

  const handleUpdate = () => {
    const formData = new FormData()
    formData.append("logo", file as Blob)
    updateMutation.mutate({ data: form.getValues(), formData })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
        <FileField
          label="Hospital Logo"
          icon={FileIcon}
          onChange={(event) => setFile(event.target.files?.[0])}
        />

        <InputField name="name" placeholder="Name" label="Name" control={form.control} />

        <InputField
          name="description"
          placeholder="Description"
          label="Description"
          control={form.control}
          isTextarea
        />

        <InputField
          name="location"
          placeholder="location"
          label="Location"
          control={form.control}
        />

        <div className="flex gap-2">
          <LoadingButton variant="blue" loading={updateMutation.isPending}>
            Update
          </LoadingButton>
          <Link href={adminRoutes.hospitals.root}>
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}
