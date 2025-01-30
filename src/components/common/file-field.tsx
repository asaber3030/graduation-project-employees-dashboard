import { Input } from "../ui/input"
import { InputProps } from "./input"
import { Label } from "../ui/label"

type Props = InputProps & {
  label: string
}

export const FileField = ({ label, ...props }: Props) => {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input type={"file"} {...props} />
    </div>
  )
}
