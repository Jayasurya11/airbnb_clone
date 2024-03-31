import React from 'react'
import { Dropdown } from 'flowbite-react';
import { HiBars3 } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Dropdown1 = () => {
  
  return (
    <Dropdown label="" renderTrigger={() => <span className='flex rounded-xl border border-gray-300 py-2 lg:px-2 text-2xl hovereffect' ><HiBars3/><FaUserCircle/></span>} dismissOnClick={true}>
                    
        <Dropdown.Item><Link to="/login">Login</Link></Dropdown.Item>
        <Dropdown.Item><Link to="/register">Register</Link></Dropdown.Item>
                    
                    
                    
    </Dropdown>
  )
}

export default Dropdown1