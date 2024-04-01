import React ,{useState} from 'react'

import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
const RegisterPage = () => {
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const handleRegister=async (e)=>{
        e.preventDefault();
        const validateEmail = () => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
          };

        if(name.length===0 || email.length===0 || password.length===0){
            setError("Fields cannot be empty")
        }
        else if(!validateEmail(email)){
            setError("Not a valid Email")
        }
        else{
            const user=await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`,{name,email,password});
            if(user.data.error){
                setError(user.data.error);
            }
            else{
                navigate("/login");
            }
        }
        
        
        
    }
  return (
    <div className='pb-10 '>
        <div className=' w-full flex flex-col items-center justify-center '>
            <h2 className='text-xl font-bold my-2'>Register</h2>
            {error?<p className='text-red-600'>{error}</p>:null}
            <form className='flex flex-col gap-4' onSubmit={handleRegister}>
                <input type="text" className="px-2 py-1 rounded-xl min-w-80 border border-gray-400" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
                <input className="px-2 py-1 rounded-xl min-w-80 border border-gray-400" type="email"  placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <input className="px-2 py-1 rounded-xl border border-gray-400" type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                
                <button type="submit" className="w-full px-2 py-1 rounded-xl border text-white bg-blue-500 " onClick={handleRegister}>Register</button>
            </form>
            <p className='font-semibold my-2'>Already a user? <Link className='underline' to="/login">Login here </Link></p>
        </div>
        

    </div>
  )
}

export default RegisterPage