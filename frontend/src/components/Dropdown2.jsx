import React ,{ useContext}from 'react'
import { Dropdown } from 'flowbite-react';
import { HiBars3 } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import { userContext } from '../context/context';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Dropdown2 = () => {
    const {setUser}= useContext(userContext);
    const handleLogout=()=>{
        
        setUser({});
        toast.success("Loged out")
    }
  return (
    <Dropdown  label="" renderTrigger={() => <span className='flex rounded-xl border border-gray-300 py-2 px-1 lg:px-2 text-2x  hovereffect' ><HiBars3/><FaUserCircle/></span>} dismissOnClick={true}>
                    
        <Dropdown.Item className='px-4 w-36 '><button onClick={handleLogout}>Logout</button></Dropdown.Item>
        <Dropdown.Item className='px-4 w-36' ><Link to="/host-a-place">Host a Place</Link></Dropdown.Item>
        <Dropdown.Item className='px-4 w-36'><Link to="/hosted-places">Hosted Places</Link></Dropdown.Item>
        <Dropdown.Item className='px-4 w-36'><Link to="/wish-list">Wish List</Link></Dropdown.Item>
        <Dropdown.Item className='px-4 w-36'><Link to="/booked-places">Booked Places</Link></Dropdown.Item>
        
        
                    
                    
                    
    </Dropdown>
  )
}

export default Dropdown2