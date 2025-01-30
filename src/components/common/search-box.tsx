"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "../ui/button"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"

type Props = {
  defaultValue?: string
  buttonClassName?: ClassValue
  children?: React.ReactNode
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

export const SearchBox = ({ value, setValue, children, buttonClassName }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn("justify-between", buttonClassName)}
        >
          {value ? value : "Select..."}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 z-50 min-w-[600px]'>
        <Command>
          <CommandInput
            onValueChange={(search: string) => setValue(search)}
            placeholder='Search...'
          />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>{children}</CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
