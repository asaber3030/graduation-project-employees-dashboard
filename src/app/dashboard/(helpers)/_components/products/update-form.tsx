"use client"

import { useSearchCategories } from "../../_hooks/useCategory"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useState } from "react"

import { updateProductAction } from "../../_actions/products"
import { showResponseMessage } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { employeesRoutes } from "../../_utils/routes"
import { z } from "zod"

import { ProductSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { CommandItem } from "@/components/ui/command"
import { ArrowRight, FileIcon, Loader2 } from "lucide-react"
import { SearchBox } from "@/components/common/search-box"
import { ActiveCheckIcon } from "@/components/common/active-check-icon"
import { LinkBtn } from "@/components/common/link-btn"
import { FileField } from "@/components/common/file-field"
import { Category, Product } from "@prisma/client"

type Mutation = {
  data: z.infer<typeof ProductSchema>
  formData: FormData
}

export const AdminUpdateProductForm = ({ product }: { product: Product & { category: Category } }) => {
  const [searchValue, setSearchValue] = useState("")
  const [selectedCategoryName, setSelectedCategoryName] = useState(product.category.name)
  const [categoryId, setCategoryId] = useState(product.categoryId)
  const [image, setImage] = useState<File | undefined>(undefined)

  const { categories, isCategoriesLoading, refetchCategories } = useSearchCategories(searchValue)

  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description || "",
      categoryId: product.categoryId,
      price: product.price
    }
  })

  const createMutation = useMutation({
    mutationFn: ({ data, formData }: Mutation) => updateProductAction(product.id, categoryId, formData, data),
    onSuccess: (data) => showResponseMessage(data)
  })

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelectedCategoryName(currentValue)
    setCategoryId(id)
  }

  const handleSubmit = () => {
    const formData = new FormData()
    if (image) {
      formData.append("image", image)
    }
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
            Update
          </LoadingButton>
          <LinkBtn variant='outline' type='button' href={employeesRoutes.products.root}>
            Close
          </LinkBtn>
        </section>
      </form>
    </Form>
  )
}
