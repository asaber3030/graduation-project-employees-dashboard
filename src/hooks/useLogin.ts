import { useMutation } from "@tanstack/react-query"
import { loginAction } from "@/actions/auth"
import { LoginData } from "@/types"

export function useLogin(onSuccess: Function) {
  const loginMutation = useMutation({
    mutationFn: ({ data, rememberMe }: LoginData) => loginAction(data, rememberMe),
    onSuccess: (data) => onSuccess(data)
  })

  return {
    mutateLogin: loginMutation.mutate,
    loginData: loginMutation.data,
    loginPending: loginMutation.isPending
  }
}
