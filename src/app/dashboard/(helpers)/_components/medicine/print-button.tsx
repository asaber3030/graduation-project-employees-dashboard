"use client"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

export const AdminMedicinePrintButton = () => {
  const print = () => {
    window.print()
  }

  return (
    <Button icon={Printer} onClick={print}>
      Print
    </Button>
  )
}
