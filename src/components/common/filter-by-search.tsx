import { ArrowRight, Loader2 } from "lucide-react"
import { Label } from "../ui/label"
import { SearchBox } from "./search-box"
import { CommandItem } from "../ui/command"
import { ActiveCheckIcon } from "./active-check-icon"

type Props = {
  formLabel?: string
  value: string
  isLoading: boolean
  data?: { value: string; label: string; id: number }[]
  setValue: React.Dispatch<React.SetStateAction<string>>
  onCommandSelect: (value: string, id: number) => void
}

export const FilterBySearch = ({
  formLabel,
  value,
  setValue,
  isLoading,
  data,
  onCommandSelect,
}: Props) => {
  return (
    <section>
      <Label>{formLabel}</Label>
      <SearchBox value={value} buttonClassName="w-full" setValue={setValue}>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            {data?.map((item) => (
              <CommandItem
                key={item.id}
                value={String(item.value)}
                onSelect={(currentValue) => onCommandSelect(currentValue, item.id)}
              >
                <ActiveCheckIcon active={value === item.value} />
                {item.label} - ID <ArrowRight className="size-4" /> <b>{item.id}</b>
              </CommandItem>
            ))}
          </>
        )}
      </SearchBox>
    </section>
  )
}
