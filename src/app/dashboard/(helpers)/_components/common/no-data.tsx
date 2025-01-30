import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { ClassValue } from "class-variance-authority/types"
import { Box } from "lucide-react"

type Props = {
  title: string
  description?: string
  parentClassName?: ClassValue
}

export const NoDataAlert = ({ parentClassName, title, description }: Props) => {
  return (
    <Alert className={cn("bg-white mt-4 space-x-2", parentClassName)}>
      <Box className="size-5" />
      <AlertTitle className="m-0 p-0">{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  )
}
