import { useAuth } from '@/features/auth'
import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { toast } from 'sonner'

const ProtectRoutes = () => {
  const { isLoading,data } = useAuth()
  const isLogin = !isLoading && data
  useEffect(()=>{
    if(!isLoading && !data) {
    toast.error('this page require to be authenticated before you can access') 
    }
  },[data,isLoading])
  return(
    isLogin ? <Outlet/> : <Navigate replace={true} to="/login"/>
  )
}

export default ProtectRoutes