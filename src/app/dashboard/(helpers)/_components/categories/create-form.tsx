"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useState } from "react"

import { createCategoryAction } from "../../_actions/categories"
import { showHospitalName, showResponseMessage } from "@/lib/utils"
import { employeesRoutes } from "../../_utils/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { z } from "zod"

import { CategorySchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { FileIcon } from "lucide-react"
import { Form } from "@/components/ui/form"
import { LinkBtn } from "@/components/common/link-btn"
import { FileField } from "@/components/common/file-field"
import { Hospital } from "@prisma/client"
import { SelectItem } from "@/components/ui/select"
import { SelectField } from "@/components/common/select-field"

type Mutation = {
  data: z.infer<typeof CategorySchema>
  formData: FormData
}

type Props = {
  hospitals: Hospital[]
}

export const AdminCreateCategoryForm = ({ hospitals }: Props) => {
  const [image, setImage] = useState<File | undefined>(undefined)

  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      description: "",
      hospitalId: 0
    }
  })

  const createMutation = useMutation({
    mutationFn: ({ data, formData }: Mutation) => createCategoryAction(formData, data),
    onSuccess: (data) => showResponseMessage(data)
  })

  const handleSubmit = () => {
    const formData = new FormData()
    if (!image) {
      toast.error("Please select an image for the category.")
      return
    }

    formData.append("image", image)

    createMutation.mutate({ data: form.getValues(), formData })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
        <FileField label='Image' icon={FileIcon} name='image' onChange={(e) => setImage(e.target.files?.[0])} />
        <SelectField name='hospitalId' label='Hospital' control={form.control}>
          {hospitals.map((h) => (
            <SelectItem value={h.id.toString()}>{showHospitalName(h)}</SelectItem>
          ))}
        </SelectField>
        <InputField name='name' label='Name' placeholder='Enter Name' control={form.control} />
        <InputField name='description' label='Description' placeholder='Enter Description' isTextarea control={form.control} />

        <section className='flex gap-2'>
          <LoadingButton type='submit' loading={createMutation.isPending} variant='success'>
            Create
          </LoadingButton>
          <LinkBtn variant='outline' type='button' href={employeesRoutes.categories.root}>
            Close
          </LinkBtn>
        </section>
      </form>
    </Form>
  )
}
