import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

const HomePage = () => {
  return (
    <div className='min-w-screen'>
        <Navbar/>
        
        <ToastContainer/>
        
        <Outlet/>
        
    </div>
  )
}

export default HomePage