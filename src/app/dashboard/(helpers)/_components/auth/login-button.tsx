"use client"

import { Button } from "@/components/ui/button"
import { useLogin } from "@/hooks/useLogin"
import { useToast } from "@/hooks/useToast"
import { APIResponse } from "@/types"

export default function LoginButton() {
  const { toast } = useToast()

  const loginData = useLogin((data: APIResponse<any, any>) => {
    toast({
      title: data.message,
      description: "Friday, February 10, 2023 at 5:57 PM"
    })
    console.log({ data })
  })

  return (
    <div>
      <Button
        onClick={() =>
          loginData.mutateLogin({
            data: { email: "a@a.com", password: "0552320541", hospitalId: 1 },
            rememberMe: false
          })
        }
      >
        Try to login
      </Button>
    </div>
  )
}
