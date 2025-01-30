"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { removeAllPermissionGroupFromEmployee } from "../../../_actions/employees"
import { showResponseMessage } from "@/lib/utils"

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
import { ResourcePermissionGroup } from "@prisma/client"
import { Button } from "@/components/ui/button"

type Props = {
  employeeId: number
  groupId: number
  group: ResourcePermissionGroup
  children: React.ReactNode
  asChild?: boolean
}

export const RemoveAllPermissionsGroupButton = ({
  employeeId,
  groupId,
  group,
  asChild = true,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: () => removeAllPermissionGroupFromEmployee(employeeId, groupId),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        setIsOpen(false)
      }),
  })

  const handleRemovingPermissions = () => {
    mutation.mutate()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild={asChild}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Removing Permission Group From Employee</AlertDialogTitle>
          <AlertDialogDescription>
            This action will remove this permissions of selected employee from the group
            <b>{group.groupName}</b> of code <b>{group.groupCode}</b>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleRemovingPermissions}>
              Remove Permissions
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
