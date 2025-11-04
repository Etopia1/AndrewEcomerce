import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import  Sidebar  from './MarchantDashboard/Marchantcomponents/common/Sidebar'

const DashboardPrivateRoute = () => {
  const marChantToken  = useSelector((state)=> state.marChantToken)
  return (
    	<div className='flex h-[100vh] bg-gray-900  text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
        {
           marChantToken  ?   <Outlet/> : <Navigate to='/marchantlogin'/>

          }
		</div>
    // <div className='w-[100%] h-[100vh] flex items-center justify-center gap-[4px] ' >
    //   <div className=" w-[20%] h-[100%] sm:hidden md:flex  items-center justify-center bg-[red] hidden ">
    //  <Sidebar/>
    //   </div>
    //   <div className="w-[100%] h-[100%] md:w-[100%] dark:bg-gray-800 flex gap-[3px] items-center justify-center flex-col">
    //     <div className=" w-[99%] h-[99%] flex items-center  ">
    //       {/* {
    //        marChantToken  ?   <Outlet/> : <Navigate to='/marchantlogin'/>

    //       } */}
    //     </div>

    //   </div>
    // </div>
  )
}

export default DashboardPrivateRoute
