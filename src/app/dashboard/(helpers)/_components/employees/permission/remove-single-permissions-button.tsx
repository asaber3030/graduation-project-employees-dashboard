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
import { removePermissionFromEmployee } from "../../../_actions/employees"
import { showResponseMessage } from "@/lib/utils"
import { useState } from "react"
import { ResourcePermission } from "@prisma/client"
import { Button } from "@/components/ui/button"

type Props = {
  employeeId: number
  permissionId: number
  permission: ResourcePermission
  children: React.ReactNode
  asChild?: boolean
}

export const AdminRemoveSinglePermissionToEmployee = ({
  employeeId,
  permissionId,
  permission,
  asChild = true,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: () => removePermissionFromEmployee(employeeId, permissionId),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        setIsOpen(false)
      }),
  })

  const handleGrantingPermission = () => {
    mutation.mutate()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild={asChild}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Removing This Permission <b>{permission.permissionName}</b> to Employee
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will remove this permission <b>{permission.permissionName}</b> from the
            employee. Are you sure you want to remove this permission from selected employee?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleGrantingPermission}>
              Remove Permissions
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
