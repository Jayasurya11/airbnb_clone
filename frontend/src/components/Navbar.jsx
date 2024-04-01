import React ,{useContext,useState}from 'react';
import { userContext } from '../context/context';
import { FaAirbnb } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";

import { Link, useNavigate } from 'react-router-dom';

import Dropdown1 from './Dropdown1';
import Dropdown2 from './Dropdown2';

const Navbar = () => {
    
    const navigate=useNavigate();
    const {user}=useContext(userContext);
    const [search,setSearch]=useState("");
    
    const handleSubmit=async (e)=>{
        e.preventDefault()
        navigate(`search/${search}`);
        setSearch("")
    }
    
  return (
    <div>
        <div className='hidden justify-between w-screen px-16 pt-8  lg:flex '> 
            <Link to="/" className="xs:text-md lg:text-2xl text-red-500 flex gap-2 items-center">
                <FaAirbnb /> airbnb
            </Link>
            <div className='flex gap-3 border rounded-xl border-gray-400   p-2 shadow-md'>
                <div >Anywhere</div>
                <div className='border border-y-0 border-gray-300 px-3'>Any week</div>
                <form className='flex ' onSubmit={handleSubmit}>
                    <input type="text" placeholder="Search by location" className='border-0 rounded-xl  h-6' value={search} onChange={(e)=>setSearch(e.target.value)} />
                    <button type="submit" className='bg-red-500 flex items-center justify-center text-md font-semibold rounded-full w-6 h-6 text-center text-white'><CiSearch /></button>
                </form>
                
            </div>
            
            <div className='flex gap-3 items-center justify-between min-w-2 lg:min-w-8'>
                
                {user.name? <div ><p>{user.name}</p></div>:<div className='flex gap-3 items-center'>Airbnb your home <TbWorld/></div>}
                <div className="relative inline-block text-left " >
                    {user.name?<Dropdown2/>:<Dropdown1/> }
                    
                </div>
            
            </div>

        </div>

        {/* sm */}
        <div className='flex flex-col w-screen lg:hidden pt-4 px-8 md:px-12  '>
            <div className='flex justify-between items-center w-100'> 
                <Link to="/" className="text-md  text-red-500 flex gap-2 items-center">
                    <FaAirbnb /> airbnb
                </Link>
                <div className='flex gap-3 items-center justify-between min-w-2 lg:min-w-8'>
                    {user.name? <div ><p>{user.name}</p></div>:<div className='flex gap-3 items-center'>Airbnb your home <TbWorld/></div>}
                    <div className="relative inline-block text-left " >
                        {user.name?<Dropdown2/>:<Dropdown1/> } 
                    </div>
                </div> 
            </div>
            <div className='grid grid-cols-5 gap-3 border rounded-xl border-black box-border lg:px-4 my-2 md:py-4 shadow-md'>
                <div className='px-3 text-sm text-center'>Any where</div>
                <div className='border border-y-0 border-black text-sm text-center px-3'>Any week</div>
                <form className='col-span-3 flex box-border justify-center items-center gap-2 px-2 md:px-8 lg:px-2' onSubmit={handleSubmit}>
                    <input type="text" placeholder="Search by location" className='border-0 rounded-xl col-span-3 w-full  h-5 md:h-8 ' value={search} onChange={(e)=>setSearch(e.target.value)} />
                    <button type="submit" className='bg-red-500 flex items-center justify-center  rounded-full  text-center w-6 h-6  text-white'><CiSearch className='text-lg font-bold '/></button>
                </form>   
            </div>
            
        </div>
    </div>
  )
}

export default Navbar