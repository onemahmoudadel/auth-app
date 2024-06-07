import { api } from "@/lib/hono"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono"
export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await api.auth.validateReq.$get()
      if (!res.ok) throw new Error("Server Error") 
      const json = await res.json()
      return json as UserSession
    }
  })
}
type UserSession = {
  id: string,
  userId: string,
}
// Mutations
type LoginResType = InferResponseType<typeof api.auth.login.$post>
type LoginReqType = InferRequestType<typeof api.auth.login.$post>

export const useLogin = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<LoginResType,Error,LoginReqType>({
    mutationFn: async(json) => {
      const res = await api.auth.login.$post(json)
      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
  })
  return {...mutation, signup : mutation.mutate }
}

type SignUpResType = InferResponseType<typeof api.auth.signup.$post>
type SignUpReqType = InferRequestType<typeof api.auth.signup.$post>

export const useSignUp = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<SignUpResType,Error,SignUpReqType>({
    mutationFn: async(json) => {
      const res = await api.auth.signup.$post(json)
      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
  })
  return {...mutation, signup : mutation.mutate }
}

type LogoutResType = InferResponseType<typeof api.auth.logout.$post>
type LogoutReqType = InferRequestType<typeof api.auth.logout.$post>

export const useLogout = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<LogoutResType,Error,LogoutReqType>({
    mutationFn: async() => {
      const res = await api.auth.logout.$post()
      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
  })
  return {...mutation, logout : mutation.mutate }
}
