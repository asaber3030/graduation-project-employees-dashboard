"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { verifyPassword } from "@/actions/app"
import { showResponseMessage } from "@/lib/utils"
import { toast } from "sonner"

import { LoadingButton } from "@/components/common/loading-button"
import { APIResponse } from "@/types"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"

interface Props {
  deletedId: number
  dialogTitle?: string
  dialogDescription?: string
  children?: React.ReactNode
  asChild?: boolean
  forceAction: (id: number) => Promise<APIResponse<any, any>>
}

export const DeleteModal = ({
  dialogTitle = "Delete Action",
  dialogDescription = "This action can be reversed later because of soft deletes but you can force delete this item.",
  deletedId,
  children,
  asChild = true,
  forceAction
}: Props) => {
  const [open, setOpen] = useState(false)
  const [secondaryModal, setSecondaryModal] = useState(false)
  const [password, setPassword] = useState("")

  const [isPasswordVerified, setIsPasswordVerified] = useState(false)

  const verifyPasswordMutation = useMutation({
    mutationFn: () => verifyPassword(password),
    onSuccess: (data) => {
      if (data.status === 200) {
        setIsPasswordVerified(true)
        setSecondaryModal(true)
        setPassword("")
        return
      }
      showResponseMessage(data)
    }
  })

  const forceDeleteMutation = useMutation({
    mutationFn: () => forceAction(deletedId),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        setOpen(false)
        setSecondaryModal(false)
      })
  })

  const handleVerifyPassword = () => {
    verifyPasswordMutation.mutate()
  }

  const handleDelete = () => {
    if (isPasswordVerified) {
      forceDeleteMutation.mutate()
    }
    toast.error("Password is not verified")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <section>
          <Label>Application Password</Label>
          <Input
            icon={Lock}
            placeholder="Enter application password"
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </section>

        {isPasswordVerified && (
          <AlertDialog open={secondaryModal} onOpenChange={setSecondaryModal}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Please make sure before processing, This action is not reversible
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="outline">Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button variant="destructive" onClick={handleDelete}>
                    Submit
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <LoadingButton
            loading={forceDeleteMutation.isPending}
            variant="destructive"
            onClick={handleVerifyPassword}
          >
            Force Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
