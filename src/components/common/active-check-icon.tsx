import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

type Props = { active: boolean }

export const ActiveCheckIcon = ({ active }: Props) => {
  return <Check className={cn("mr-2 h-4 w-4", active ? "opacity-100" : "opacity-0")} />
}
