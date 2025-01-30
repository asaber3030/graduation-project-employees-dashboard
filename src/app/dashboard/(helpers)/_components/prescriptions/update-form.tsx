"use client"

import { Fragment, useEffect, useState } from "react"
import { useSearchPatients } from "../../_hooks/usePatient"
import { useSearchDoctors } from "../../_hooks/useDoctor"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { PrescriptionSchema } from "@/schema"
import { ActiveCheckIcon } from "@/components/common/active-check-icon"
import { LoadingButton } from "@/components/common/loading-button"
import { CommandItem } from "@/components/ui/command"
import { SearchBox } from "@/components/common/search-box"
import { ArrowRight, Loader2 } from "lucide-react"
import { LinkBtn } from "@/components/common/link-btn"
import { Label } from "@/components/ui/label"

import { updatePrescriptionAction } from "../../_actions/prescriptions"
import { showResponseMessage } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { employeesRoutes } from "../../_utils/routes"
import { ATFullPrescritpion } from "../../_types"

type Mutation = {
  patientId: number
  doctorId: number
}

type Props = {
  prescription: ATFullPrescritpion
}

export const AdminUpdatePrescriptionForm = ({ prescription }: Props) => {
  const form = useForm({
    resolver: zodResolver(PrescriptionSchema.create),
    defaultValues: {
      patientId: prescription.patientId,
      doctorId: prescription.doctorId
    }
  })

  const [searchDoctorsValue, setSearchDoctorsValue] = useState("")
  const [searchPatientsValue, setSearchPatientsValue] = useState("")
  const [selectedDoctorName, setSelectedDoctorName] = useState(
    prescription.doctor.name + "#" + prescription.doctor.id
  )
  const [selectedPatientName, setSelectedPatientName] = useState(
    prescription.patient.name + "#" + prescription.patient.id
  )
  const [doctorId, setDoctorId] = useState(prescription.doctorId)
  const [patientId, setPatientId] = useState(prescription.patientId)

  const { doctors, isDoctorsLoading, refetchDoctors } = useSearchDoctors(searchDoctorsValue)
  const { patients, isPatientsLoading, refetchPatients } = useSearchPatients(searchPatientsValue)

  const updateMutation = useMutation({
    mutationFn: ({ patientId, doctorId }: Mutation) =>
      updatePrescriptionAction(prescription.id, patientId, doctorId),
    onSuccess: (data) => showResponseMessage(data)
  })

  const onCommandSelectDoctor = (currentValue: string, id: number) => {
    setSelectedDoctorName(currentValue)
    setDoctorId(id)
  }

  const onCommandSelectPatient = (currentValue: string, id: number) => {
    setSelectedPatientName(currentValue)
    setPatientId(id)
  }

  const handleSubmit = () => {
    updateMutation.mutate({ patientId, doctorId })
  }

  useEffect(() => {
    refetchDoctors()
  }, [searchDoctorsValue])

  useEffect(() => {
    refetchPatients()
  }, [searchPatientsValue])

  return (
    <div className='space-y-3'>
      <section>
        <Label>Select Doctor</Label>
        <SearchBox
          value={selectedDoctorName}
          buttonClassName='w-full'
          setValue={setSearchDoctorsValue}
        >
          {isDoctorsLoading ? (
            <div className='flex items-center justify-center'>
              <Loader2 className='animate-spin' />
            </div>
          ) : (
            <>
              {doctors?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={String(item.name + "#" + item.id)}
                  onSelect={(currentValue) => onCommandSelectDoctor(currentValue, item.id)}
                >
                  <ActiveCheckIcon active={selectedDoctorName === item.name + "#" + item.id} />
                  {item.name} - ID <ArrowRight className='size-4' /> <b>{item.id}</b>
                </CommandItem>
              ))}
            </>
          )}
        </SearchBox>
      </section>

      <section>
        <Label>Select Patient</Label>
        <SearchBox
          value={selectedPatientName}
          buttonClassName='w-full'
          setValue={setSearchPatientsValue}
        >
          {isPatientsLoading ? (
            <div className='flex items-center justify-center'>
              <Loader2 className='animate-spin' />
            </div>
          ) : (
            <Fragment>
              {patients?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={String(item.name + "#" + item.id)}
                  onSelect={(currentValue) => onCommandSelectPatient(currentValue, item.id)}
                >
                  <ActiveCheckIcon active={selectedPatientName === item.name + "#" + item.id} />
                  {item.name} - ID <ArrowRight className='size-4' /> <b>{item.id}</b>
                </CommandItem>
              ))}
            </Fragment>
          )}
        </SearchBox>
      </section>

      <section className='flex gap-2'>
        <LoadingButton
          type='submit'
          loading={updateMutation.isPending}
          variant='success'
          onClick={handleSubmit}
        >
          Create
        </LoadingButton>
        <LinkBtn type='button' variant='outline' href={employeesRoutes.prescriptions.root}>
          Cancel
        </LinkBtn>
      </section>
    </div>
  )
}
