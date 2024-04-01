import React from 'react'
import { Footer } from "flowbite-react";
import { FaLinkedin } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { Link } from 'react-router-dom';
const FooterComp = () => {
  return (
    <div className='border border-gray-300 shadow-lg'>
        <Footer container className='flex justify-between'>
        {/* <p><Footer.Copyright href="/" classNam  by="Airbnb - Jayasurya E" year={2024} ></Footer.Copyright></p> */}
        <p className='text-gray-500'>© 2024 Airbnb - Jayasurya E</p>
        <Footer.LinkGroup className='flex justify-center items-center gap-4 lg:gap-12'>
          <a href="https://www.linkedin.com/in/jayasurya-e-bbbbb9207/" target="_blank"><FaLinkedin/></a>
          <a href="https://jayasurya11.github.io/portfolio/" target="_blank"><MdWork/></a>
          <a href="mailto:jayasuryae11@gmail.com" ><MdOutlineMail/></a>          
        </Footer.LinkGroup>
        </Footer>
    </div>
  )
}

export default FooterComp