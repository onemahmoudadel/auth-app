import { useAuth } from '@/features/auth'
import { Outlet, Navigate } from 'react-router-dom'

const AuthRoutes = () => {
  const { isLoading,data } = useAuth()
  const isLogin = !isLoading && !data
  return(
    isLogin ? <Outlet/> : <Navigate replace={true} to="/"/>
  )
}

export default AuthRoutes