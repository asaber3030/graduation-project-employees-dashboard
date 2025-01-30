"use client"

import { Button, ButtonProps } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export const GoBack = ({ ...props }: ButtonProps) => {
  const router = useRouter()
  const goBack = () => router.back()

  return (
    <Button {...props} onClick={goBack} variant="outline">
      <ArrowLeft className="size-4" /> Go Back
    </Button>
  )
}
