import React, { useState,useContext } from 'react';

import { userContext } from '../context/context';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const LoginPage = () => {
    const {setUser}= useContext(userContext);
    const navigate=useNavigate();
    const [error,setError]=useState("");
    const[email,setEmail]=useState("");
    const [ password,setPassword]=useState("");

    const handleLogin=async (e)=>{
        e.preventDefault();
        
        if(email.length===0 || password.length===0){
            setError("Fields cannot be empty")
        }
        else{
            const response= await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`,{email,password});
            if(response.data.error){
                setError(response.data.error)
            }
            else{
                
                toast.success(`Welcome ${response.data.name}`)
                setUser(response.data);
                navigate("/");
            }
        }
    }
    
  return (
    <div>
        <div className=' w-full flex flex-col h-[550px] items-center justify-center '>
            <h2 className='text-xl font-bold my-2'>Login</h2>
            {error?<p className='text-red-500 '>{error}</p>:null}
            <form className='flex flex-col gap-4' >
                <input className="px-2 py-1 rounded-xl min-w-80 border border-gray-400" value={email}  onChange={(e)=>setEmail(e.target.value)} type="email"  placeholder='Email' required/>
                <input className="px-2 py-1 rounded-xl border border-gray-400" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' required/>
                
                <button className="w-full px-2 py-1 rounded-xl border text-white bg-blue-500 " onClick={handleLogin}>Login</button>
                
            </form>
            <p className='font-semibold my-2'>New user? <Link className='underline' to="/register">Register here </Link></p>
        </div>
        

    </div>
  )
}

export default LoginPage