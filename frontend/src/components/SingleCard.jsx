import React,{useContext,useState} from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { Carousel } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';

import { FaHeart } from "react-icons/fa6";

import { userContext } from '../context/context';
import { LuPencil } from "react-icons/lu";
import axios from 'axios';

const SingleCard=({data,allowedit})=> {
  
  
  const {user,setUser}=useContext(userContext);
  
  const [userdata,setUserdata]=useState(user);
  
  const navigate=useNavigate();
  const handleLike=async (e,id)=>{
    if(user.name){
      
      const d= await axios.put(`${process.env.REACT_APP_SERVER_URL}/wish-list/${user.email}/${id}`);
      
      const v={...user,wishlist:d.data.wishlist}
      setUserdata({...v});
      setUser({...v});
      
    }
    else{
      navigate("/login");
    }
    
  }
  return(
    
        <Card sx={{ maxWidth: 345 }} >
          <div className='relative '>
              
                <CardMedia className='w-full h-40'>  
                <div className='h-40 w-full'>
                  <Carousel slide={false} className=''>
                      {data?.images.map((item,index)=> <Link key={index} to={`/place/${data._id}`}><img   className='h-40 w-full'  src={item} alt="..."  /></Link> )}
                      
                      
                    </Carousel>
                </div>
                  
                </CardMedia >

              
              

              
              
              
              {!user.name && <button className='absolute top-2 right-3 text-white text-xl '> <FaHeart onClick={(e)=>handleLike(e,data._id)}/></button>}
              {user?.wishlist && <button className='absolute top-2 right-3 text-white text-xl '  >{userdata.wishlist.includes(data._id)?<FaHeart  className="text-red-500" onClick={(e)=>handleLike(e,data._id)}/>:<FaHeart onClick={(e)=>handleLike(e,data._id)}/>} </button>} 
          </div>
      
      <Link to={`/place/${data._id}`}>
      <CardContent className='h-40 flex flex-col justify-evenly'>
        <Typography sx={{ color: 'text.primary', fontSize: 20, fontWeight: 'bold' }} variant='p'>{data.name}</Typography> 
        <Typography variant="body2" color="text.secondary">{data.city},{data.state==="NA"?`${data.country}`:`${data.state}`}</Typography>
        <Typography variant="body2" color="text.secondary">{data.bed===1? <span>{data.bed} bed</span>:<span>{data.bed} beds</span>}</Typography>
        <Typography className='flex justify-between'><p>{data.price.toLocaleString("hi-IN", {style:"currency", currency:"INR",minimumFractionDigits: 0,})}<span className='text-gray-500'> night</span></p>
        
        {allowedit?<Link className="px-2 py-1 bg-gray-300 font-bold text-gray-600 flex items-center gap-2" to={`/edit-a-place/${data._id}`}><LuPencil />Edit</Link>:null}</Typography>

      </CardContent>
      </Link>
    </Card>


    
    
  )
}
export default SingleCard