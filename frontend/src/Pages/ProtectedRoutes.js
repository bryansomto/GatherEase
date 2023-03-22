import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useGlobally } from '../context/AppContext'
const ProtectedRoutes = () => {
    const {user} = useGlobally()
    if(!user){
        return <Navigate to="/"/>
    }
  return <Outlet/>
}

export default ProtectedRoutes