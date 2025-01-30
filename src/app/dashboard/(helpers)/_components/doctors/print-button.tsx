"use client"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

export const AdminDoctorPrintButton = () => {
  const print = () => {
    window.print()
  }

  return (
    <Button onClick={print} icon={Printer}>
      Print
    </Button>
  )
}
