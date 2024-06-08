import { api } from "@/lib/hono"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { InferRequestType, InferResponseType } from "hono"
export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await api.auth.validate.$get()
      if (!res.ok) throw new Error("Something went wrong!") 
      const {user} = await res.json()
      return user
    }
  })
}

// Mutations
type LoginResType = InferResponseType<typeof api.auth.login.$post>
type LoginReqType = InferRequestType<typeof api.auth.login.$post>

export const useLogin = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<LoginResType,Error,LoginReqType>({
    mutationFn: async(data) => {
      const res = await api.auth.login.$post(data)
      const resData = await res.json()
      if (resData.error !== null) throw new Error(resData.error) 
      return resData
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
  })
  return {...mutation, login : mutation.mutate }
}

type SignUpResType = InferResponseType<typeof api.auth.signup.$post>
type SignUpReqType = InferRequestType<typeof api.auth.signup.$post>

export const useSignUp = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<SignUpResType,Error,SignUpReqType>({
    mutationFn: async(data) => {
      const res = await api.auth.signup.$post(data)
      // if (!res.ok) throw new Error("Something went wrong!") 
      const resData = await res.json()
      // if (resData.error !== null) throw new Error(resData.error) 
      return resData
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
  })
  
  return {...mutation, signup : mutation.mutate, }
}

type LogoutResType = InferResponseType<typeof api.auth.logout.$post>
type LogoutReqType = InferRequestType<typeof api.auth.logout.$post>

export const useLogout = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<LogoutResType,Error,LogoutReqType>({
    mutationFn: async() => {
      const res = await api.auth.logout.$post()
      const resData = await res.json()
      if (resData.error !== null) throw new Error(resData.error) 
      return resData
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
  })
  return {...mutation, logout : mutation.mutate }
}
