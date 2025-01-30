"use client"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

export const AdminPrescriptionPrintButton = () => {
  return (
    <Button icon={Printer} onClick={() => window.print()}>
      Print
    </Button>
  )
}
