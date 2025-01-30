import { Control } from "react-hook-form"
import { Input } from "../ui/input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import { ClassValue } from "class-variance-authority/types"
import { cn } from "@/lib/utils"

type Props = {
  label: string
  name: string
  isTextarea?: boolean
  control: Control<any, any>
  type?: string
  disabled?: boolean
  value?: string
  register?: any
  placeholder?: string
  defaultValue?: string | number
  valuseAsNumber?: boolean
  className?: ClassValue
}

export const InputField = ({
  name,
  disabled,
  label,
  isTextarea = false,
  placeholder,
  type,
  control,
  register,
  valuseAsNumber,
  defaultValue,
  value,
  className,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isTextarea ? (
              <Textarea
                disabled={disabled}
                className="resize-none h-32"
                placeholder={placeholder}
                {...field}
              >
                {defaultValue}
              </Textarea>
            ) : (
              <Input
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={cn(className)}
                {...field}
                {...register}
                onChange={
                  valuseAsNumber ? (e) => field.onChange(parseInt(e.target.value)) : field.onChange
                }
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
