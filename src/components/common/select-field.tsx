import React from "react"

import { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  label: string
  name: string
  control: Control<any, any>
  placeholder?: string
  defaultValue?: string
  disabled?: boolean
  children: React.ReactNode
  valueAsNumber?: boolean
}

export const SelectField = ({
  valueAsNumber,
  name,
  disabled = false,
  label,
  control,
  placeholder,
  children,
  defaultValue,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={
                valueAsNumber ? (value) => field.onChange(parseInt(value)) : field.onChange
              }
              defaultValue={defaultValue}
            >
              <FormControl>
                <SelectTrigger disabled={disabled} className="bg-white" defaultValue={defaultValue}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>{children}</SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
