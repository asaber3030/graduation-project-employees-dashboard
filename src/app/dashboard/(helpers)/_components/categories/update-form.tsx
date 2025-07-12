"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useState } from "react"

import { updateCategoryAction } from "../../_actions/categories"
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
import { Category, Hospital } from "@prisma/client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type Mutation = {
  data: z.infer<typeof CategorySchema>
  formData: FormData
  hospitalId: number
}

type Props = {
  hospitals: Hospital[]
  category: Category
}

export const AdminUpdateCategoryForm = ({ hospitals, category }: Props) => {
  const [image, setImage] = useState<File | undefined>(undefined)
  const [hospitalId, setHospitalId] = useState<number>(category.hospitalId)

  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category.name,
      description: category.description || ""
    }
  })

  const createMutation = useMutation({
    mutationFn: ({ data, formData, hospitalId }: Mutation) => updateCategoryAction(category.id, hospitalId, formData, data),
    onSuccess: (data) => showResponseMessage(data)
  })

  const handleSubmit = () => {
    const formData = new FormData()

    if (!hospitalId) {
      toast.error("Please select a hospital")
      return
    }

    if (image) {
      formData.append("image", image)
    }

    createMutation.mutate({ data: form.getValues(), hospitalId, formData })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
        <FileField label='Image' icon={FileIcon} name='image' onChange={(e) => setImage(e.target.files?.[0])} />
        <div>
          <Label>Select hospital</Label>
          <Select defaultValue={category.hospitalId.toString()} onValueChange={(v) => setHospitalId(+v)}>
            <SelectTrigger>
              <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent>
              {hospitals.map((h) => (
                <SelectItem value={h.id.toString()}>{showHospitalName(h)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <InputField name='name' label='Name' placeholder='Enter Name' control={form.control} />
        <InputField name='description' label='Description' placeholder='Enter Description' isTextarea control={form.control} />

        <section className='flex gap-2'>
          <LoadingButton type='submit' loading={createMutation.isPending} variant='success'>
            Update
          </LoadingButton>
          <LinkBtn variant='outline' type='button' href={employeesRoutes.categories.root}>
            Close
          </LinkBtn>
        </section>
      </form>
    </Form>
  )
}
