"use client"

import { useSearchMedicine } from "../../_hooks/useMedicine"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { updatePrescriptionItemAction } from "../../_actions/prescriptions"
import { showResponseMessage } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { employeesRoutes } from "../../_utils/routes"
import { z } from "zod"

import { PrescriptionItemSchema } from "@/schema"
import { PrescriptionItem } from "@prisma/client"
import { ActiveCheckIcon } from "@/components/common/active-check-icon"
import { CommandItem } from "@/components/ui/command"
import { LoadingButton } from "@/components/common/loading-button"
import { InputField } from "@/components/common/input-field"
import { SearchBox } from "@/components/common/search-box"
import { LinkBtn } from "@/components/common/link-btn"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

type Props = {
  item: PrescriptionItem
}

type Mutation = {
  medicineId: number
  data: z.infer<typeof PrescriptionItemSchema.create>
}

export const AdminUpdatePrescriptionItemForm = ({ item }: Props) => {
  const form = useForm({
    resolver: zodResolver(PrescriptionItemSchema.update),
    defaultValues: {
      quantity: item.quantity,
      dosage: item.dosage,
      duration: item.duration,
      timesPerDay: item.timesPerDay,
      notes: item.notes
    }
  })

  const [searchValue, setSearchValue] = useState("")
  const [selectedMedicineName, setSelectedMedicineName] = useState("")
  const [medicineId, setMedicineId] = useState(0)

  const { medicine, isMedicineLoading, refetchMedicine } = useSearchMedicine(searchValue)

  const createMutation = useMutation({
    mutationFn: ({ medicineId, data }: Mutation) =>
      updatePrescriptionItemAction(item.id, medicineId, data),
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
            defaultValue={searchValue}
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

        <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
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
          <LoadingButton type='submit' loading={createMutation.isPending} variant='blue'>
            Update
          </LoadingButton>
          <LinkBtn
            type='button'
            variant='outline'
            href={employeesRoutes.prescriptions.view(item.prescriptionId)}
          >
            Cancel
          </LinkBtn>
        </section>
      </form>
    </Form>
  )
}
