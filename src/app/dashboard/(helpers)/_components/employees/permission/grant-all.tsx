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
  grantAllPermissionGroupToEmployee,
  grantAllPermissionsToEmployee,
} from "../../../_actions/employees"
import { showResponseMessage } from "@/lib/utils"
import { useState } from "react"
import { ResourcePermissionGroup } from "@prisma/client"
import { Button } from "@/components/ui/button"

type Props = {
  employeeId: number

  children: React.ReactNode
  asChild?: boolean
}

export const GrantAllPermissionsToEmployeeButton = ({
  employeeId,

  asChild = true,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: () => grantAllPermissionsToEmployee(employeeId),
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
          <AlertDialogTitle>Give All Permissions to Selected employee</AlertDialogTitle>
          <AlertDialogDescription>
            This action will give this employee all permissions. Are you sure you want to give all?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="blue" onClick={handleGrantingPermissions}>
              Grant Permissions
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
