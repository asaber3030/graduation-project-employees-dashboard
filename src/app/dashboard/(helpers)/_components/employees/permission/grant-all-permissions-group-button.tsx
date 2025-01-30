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
import { grantAllPermissionGroupToEmployee } from "../../../_actions/employees"
import { showResponseMessage } from "@/lib/utils"
import { useState } from "react"
import { ResourcePermissionGroup } from "@prisma/client"
import { Button } from "@/components/ui/button"

type Props = {
  employeeId: number
  groupId: number
  group: ResourcePermissionGroup
  children: React.ReactNode
  asChild?: boolean
}

export const GrantAllPermissionsGroupButton = ({
  employeeId,
  groupId,
  group,
  asChild = true,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: () => grantAllPermissionGroupToEmployee(employeeId, groupId),
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
          <AlertDialogTitle>Granting Permissions to Employee</AlertDialogTitle>
          <AlertDialogDescription>
            This action will grant this employee all permissions in the group{" "}
            <b>{group.groupName}</b> of code <b>{group.groupCode}</b>
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
