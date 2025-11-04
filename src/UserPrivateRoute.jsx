import React from 'react'
import PrivaRoue from './PrivaRoue'
import { Navigate, Outlet } from 'react-router-dom'
import Footer from './MarchantDashboard/Pages/HomePage/Footer'
import Navbar from './components/Navbar/Navbar'
import Header from './MarchantDashboard/Pages/HomePage/Header'
import { useSelector } from 'react-redux'

const UserPrivateRoute = () => {
  const token = useSelector((state)=> state.token)
  return (
    <>


<Header/>  
{
  token ?  <Outlet/> : <Navigate to='/'/>
}
 
<Footer/>
     
    </>
  )
}

export default UserPrivateRoute
