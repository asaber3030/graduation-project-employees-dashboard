"use client"

import Link from "next/link"
import React from "react"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useState } from "react"

import { showResponseMessage } from "@/lib/utils"
import { employeesRoutes } from "../../_utils/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MedicineSchema } from "@/schema"
import { FilterBySearch } from "@/components/common/filter-by-search"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { DosageForm, Hospital } from "@prisma/client"
import { useSearchInventories } from "../../_hooks/useInventory"
import { createMedicineAction } from "../../_actions/medicine"
import { FileField } from "@/components/common/file-field"
import { FileIcon } from "lucide-react"
import { Label } from "@/components/ui/label"

type Mutation = {
  data: z.infer<typeof MedicineSchema.create>
  inventoryId: number
  dosageFormId: number
  formData: FormData
}

type Props = {
  hospitals: Hospital[]
  dosageForms: DosageForm[]
}

export const AdminCreateMedicineForm = ({ hospitals, dosageForms }: Props) => {
  const form = useForm({
    resolver: zodResolver(MedicineSchema.create)
  })

  const [searchValue, setSearchValue] = useState("")
  const [selectedInventoryName, setSelectedSelecetedName] = useState("")
  const [inventoryId, setInventoryId] = useState(0)
  const [dosageFormId, setDosageFormId] = useState(0)
  const [image, setImage] = useState<File | undefined>(undefined)
  const [barcode, setBarcode] = useState<File | undefined>(undefined)

  const { inventories, isInventoriesLoading, refetchInventories } = useSearchInventories(searchValue)

  const departmentsValues = inventories?.map((inventory) => ({
    id: inventory.id,
    label: inventory.name,
    value: inventory.name + "#" + inventory.id
  }))

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelectedSelecetedName(currentValue)
    setInventoryId(id)
  }

  const createMutation = useMutation({
    mutationFn: ({ inventoryId, dosageFormId, data, formData }: Mutation) => createMedicineAction(dosageFormId, inventoryId, data, formData),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        console.log(data)
      })
  })

  const handleCreate = () => {
    const formData = new FormData()

    formData.append("image", image as Blob)
    formData.append("barcode", barcode as Blob)

    createMutation.mutate({
      data: form.getValues() as z.infer<typeof MedicineSchema.create>,
      inventoryId,
      dosageFormId,
      formData
    })
  }

  useEffect(() => {
    refetchInventories()
  }, [searchValue])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-4'>
        <FilterBySearch formLabel='Select an inventory' value={selectedInventoryName} setValue={setSearchValue} isLoading={isInventoriesLoading} onCommandSelect={onCommandSelect} data={departmentsValues} />

        <div>
          <Label>Select Dosage Form</Label>
          <Select onValueChange={(value) => setDosageFormId(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder='Select a Dosage Form' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {dosageForms.map((dosageForm) => (
                  <SelectItem key={`dosage-form-${dosageForm.id}`} value={String(dosageForm.id)}>
                    {dosageForm.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <FileField label='Image' icon={FileIcon} name='image' onChange={(e) => setImage(e.target.files?.[0])} />
          <FileField label='Barcode Image' icon={FileIcon} name='barcode' onChange={(e) => setBarcode(e.target.files?.[0])} />
        </div>

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <InputField name='arName' placeholder='Arabic Name' label='Arabic Name' control={form.control} />
          <InputField name='enName' placeholder='English Name' label='English Name' control={form.control} />
        </div>

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <InputField isTextarea name='enDescription' placeholder='English Description' label='English Description' control={form.control} />
          <InputField isTextarea name='arDescription' placeholder='Arabic Description' label='Arabic Description' control={form.control} />
        </div>

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <InputField name='activeIngredients' placeholder='Active Ingredients' label='Active Ingredients' control={form.control} />
          <InputField valuseAsNumber name='totalTablets' placeholder='Total Tablets' label='Total Tablets' type='number' control={form.control} />
        </div>

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <InputField name='bgColor' placeholder='Background Color' label='Background Color' type='color' control={form.control} />
          <InputField name='textColor' placeholder='Text Color' label='Text Color' type='color' control={form.control} />
        </div>

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <InputField name='notes' placeholder='Notes' label='Notes' control={form.control} />
          <InputField name='concentration' placeholder='Concentration' label='Concentration' control={form.control} />
        </div>

        <InputField valuseAsNumber name='price' placeholder='Price' type='number' label='Price' control={form.control} />

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
          <InputField valuseAsNumber name='numberOfTape' placeholder='Number Of Tapes' label='Number Of Tapes' control={form.control} />
          <InputField valuseAsNumber name='numberOfPillsPerTape' placeholder='Number Of Pills Per Tape' label='Number Of Pills Per Tape' control={form.control} />
        </div>

        <div className='flex gap-2'>
          <LoadingButton variant='success' loading={createMutation.isPending}>
            Create
          </LoadingButton>

          <Link href={employeesRoutes.medicine.root}>
            <Button variant='outline'>Cancel</Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}
