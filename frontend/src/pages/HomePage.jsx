import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import FooterComp from '../components/FooterComp'


const HomePage = () => {
  return (
    <div className='min-w-screen min-h-screen flex flex-col justify-between'>
        <Navbar/>
        
        <ToastContainer/>
        
        <Outlet/>
        <FooterComp/>
        
    </div>
  )
}

export default HomePage