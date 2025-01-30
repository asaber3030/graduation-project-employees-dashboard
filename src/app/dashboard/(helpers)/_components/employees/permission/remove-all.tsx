"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useMutation } from "@tanstack/react-query"
import {
  grantAllPermissionsToEmployee,
  removeAllPermissionGroupFromEmployee,
  removeAllPermissionsFromEmployee,
} from "../../../_actions/employees"
import { showResponseMessage } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

type Props = {
  employeeId: number

  children: React.ReactNode
  asChild?: boolean
}

export const RemoveAllPermissionsFromEmployeeButton = ({
  employeeId,

  asChild = true,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: () => removeAllPermissionsFromEmployee(employeeId),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        setIsOpen(false)
      }),
  })

  const handleGrantingPermissions = () => {
    mutation.mutate()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild={asChild}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove All Permissions From Selected employee</AlertDialogTitle>
          <AlertDialogDescription>
            This action will remove this employee all permissions. Are you sure you want to remove
            all?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleGrantingPermissions}>
              Remove Permissions
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
