"use client"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useSearchMedicine } from "../../_hooks/useMedicine"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CommandItem } from "@/components/ui/command"
import { Loader2 } from "lucide-react"

import { Form } from "@/components/ui/form"
import { InputField } from "@/components/common/input-field"
import { SearchBox } from "@/components/common/search-box"
import { ActiveCheckIcon } from "@/components/common/active-check-icon"
import { zodResolver } from "@hookform/resolvers/zod"
import { PrescriptionItemSchema } from "@/schema"
import { LoadingButton } from "@/components/common/loading-button"
import { LinkBtn } from "@/components/common/link-btn"
import { employeesRoutes } from "../../_utils/routes"
import { useMutation } from "@tanstack/react-query"
import { createPrescriptionItemAction } from "../../_actions/prescriptions"
import { z } from "zod"
import { showResponseMessage } from "@/lib/utils"

type Props = {
  prescriptionId: number
}

type Mutation = {
  medicineId: number
  data: z.infer<typeof PrescriptionItemSchema.create>
}

export const AdminCreatePrescriptionItemForm = ({ prescriptionId }: Props) => {
  const form = useForm({
    resolver: zodResolver(PrescriptionItemSchema.create),
    defaultValues: {
      quantity: 0,
      dosage: "",
      duration: "",
      timesPerDay: 0,
      notes: ""
    }
  })

  const [searchValue, setSearchValue] = useState("")
  const [selectedMedicineName, setSelectedMedicineName] = useState("")
  const [medicineId, setMedicineId] = useState(0)

  const { medicine, isMedicineLoading, refetchMedicine } = useSearchMedicine(searchValue)

  const createMutation = useMutation({
    mutationFn: ({ medicineId, data }: Mutation) =>
      createPrescriptionItemAction(medicineId, prescriptionId, data),
    onSuccess: (data) => showResponseMessage(data)
  })

  useEffect(() => {
    refetchMedicine()
  }, [searchValue])

  const onCommandSelect = (currentValue: string, id: number) => {
    setSelectedMedicineName(currentValue)
    setMedicineId(id)
  }

  const handleSubmit = () => {
    createMutation.mutate({ medicineId, data: form.getValues() })
    console.log(form.getValues())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
        <section>
          <Label>Select Medicine</Label>
          <SearchBox
            value={selectedMedicineName}
            buttonClassName='w-full'
            setValue={setSearchValue}
          >
            {isMedicineLoading ? (
              <div className='flex items-center justify-center'>
                <Loader2 className='animate-spin' />
              </div>
            ) : (
              <>
                {medicine?.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={String(item.enName)}
                    onSelect={(currentValue) => onCommandSelect(currentValue, item.id)}
                  >
                    <ActiveCheckIcon active={selectedMedicineName === item.enName} />
                    {item.enName}
                  </CommandItem>
                ))}
              </>
            )}
          </SearchBox>
        </section>

        <InputField
          name='quantity'
          label='Quantity'
          placeholder='Enter Quantity'
          valuseAsNumber
          control={form.control}
        />

        <div className='grid xl:grid-cols-2 gap-4'>
          <InputField
            name='dosage'
            label='Dosage'
            placeholder='Enter Dosage'
            control={form.control}
          />

          <InputField
            name='duration'
            label='Duration'
            placeholder='Enter Duration'
            control={form.control}
          />
        </div>

        <InputField
          name='notes'
          label='Notes'
          placeholder='Enter Notes'
          isTextarea
          control={form.control}
        />

        <InputField
          name='timesPerDay'
          valuseAsNumber
          label='Times/Day'
          placeholder='Enter timesPerDay'
          control={form.control}
        />

        <section className='flex gap-2'>
          <LoadingButton type='submit' loading={createMutation.isPending} variant='success'>
            Create
          </LoadingButton>
          <LinkBtn
            type='button'
            variant='outline'
            href={employeesRoutes.prescriptions.view(prescriptionId)}
          >
            Cancel
          </LinkBtn>
        </section>
      </form>
    </Form>
  )
}
