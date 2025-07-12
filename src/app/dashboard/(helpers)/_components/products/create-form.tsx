"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import React, { useState } from "react"

import { createInventoryAction } from "../../_actions/inventories"
import { useSearchDepartments } from "../../_hooks/useDepartment"
import { showResponseMessage } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { InventorySchema, ProductSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { CommandItem } from "@/components/ui/command"
import { ArrowRight, FileIcon, Loader2 } from "lucide-react"
import { SearchBox } from "@/components/common/search-box"
import { ActiveCheckIcon } from "@/components/common/active-check-icon"
import { LinkBtn } from "@/components/common/link-btn"
import { employeesRoutes } from "../../_utils/routes"
import { createProductAction } from "../../_actions/products"
import { toast } from "sonner"
import { useSearchCategories } from "../../_hooks/useCategory"
import { FileField } from "@/components/common/file-field"

type Mutation = {
  data: z.infer<typeof ProductSchema>
  formData: FormData
}

export const AdminCreateProductForm = () => {
  const [searchValue, setSearchValue] = useState("")
  const [selectedCategoryName, setSelectedCategoryName] = useState("")
  const [categoryId, setCategoryId] = useState(0)
  const [image, setImage] = useState<File | undefined>(undefined)

  const { categories, isCategoriesLoading, refetchCategories } = useSearchCategories(searchValue)

  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: 0,
      price: 0
    }
  })

  const createMutation = useMutation({
    mutationFn: ({ data, formData }: Mutation) => createProductAction(categoryId, formData, data),
    onSuccess: (data) => showResponseMessage(data)
  })

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelectedCategoryName(currentValue)
    setCategoryId(id)
  }

  const handleSubmit = () => {
    const formData = new FormData()
    if (!image) {
      toast.error("Please select an image for the product.")
      return
    }
    if (!categoryId) {
      toast.error("Please select a category for the product.")
      return
    }
    formData.append("image", image)
    createMutation.mutate({ data: form.getValues(), formData })
  }

  useEffect(() => {
    refetchCategories()
  }, [searchValue])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
        <FileField label='Image' icon={FileIcon} name='image' onChange={(e) => setImage(e.target.files?.[0])} />

        <section>
          <Label>Select Category</Label>
          <SearchBox value={selectedCategoryName} buttonClassName='w-full' setValue={setSearchValue}>
            {isCategoriesLoading ? (
              <div className='flex items-center justify-center'>
                <Loader2 className='animate-spin' />
              </div>
            ) : (
              <>
                {categories?.map((item) => (
                  <CommandItem key={item.id} value={String(item.name + "#" + item.id)} onSelect={(currentValue) => onCommandSelect(currentValue, item.id)}>
                    <ActiveCheckIcon active={selectedCategoryName === item.name + "#" + item.id} />
                    {item.name} - ID <ArrowRight className='size-4' /> <b>{item.id}</b>
                  </CommandItem>
                ))}
              </>
            )}
          </SearchBox>
        </section>

        <InputField name='name' label='Name' placeholder='Enter Name' control={form.control} />
        <InputField name='price' label='Price' placeholder='Price' control={form.control} type='number' valuseAsNumber />
        <InputField name='description' label='Description' placeholder='Enter Description' isTextarea control={form.control} />

        <section className='flex gap-2'>
          <LoadingButton type='submit' loading={createMutation.isPending} variant='success'>
            Create
          </LoadingButton>
          <LinkBtn variant='outline' type='button' href={employeesRoutes.products.root}>
            Close
          </LinkBtn>
        </section>
      </form>
    </Form>
  )
}
