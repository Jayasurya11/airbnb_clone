import React,{useContext,useState} from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { Carousel } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { FaHeart } from "react-icons/fa6";

import { userContext } from '../context/context';
import axios from 'axios';

const BookedCard=({data,allowedit})=> {
  
  
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
                      {data.booked.images.map((item,index)=> <Link key={index} to={`/place/${data.booked._id}`}><img   className='h-40 w-full'  src={item} alt="..."  /></Link> )}
                      
                      
                    </Carousel>
                </div>
                  
                </CardMedia >

              {!user.name && <button className='absolute top-2 right-3 text-white text-xl '> <FaHeart onClick={(e)=>handleLike(e,data.booked._id)}/></button>}
              {user?.wishlist && <button className='absolute top-2 right-3 text-white text-xl '  >{userdata.wishlist.includes(data.booked._id)?<FaHeart  className="text-red-500" onClick={(e)=>handleLike(e,data.booked._id)}/>:<FaHeart onClick={(e)=>handleLike(e,data._id)}/>} </button>} 
          </div>
      
        <Link to={`/place/${data.booked._id}`}>
        <CardContent className='h-60 flex flex-col justify-evenly'>
            <Typography sx={{ color: 'text.primary', fontSize: 20, fontWeight: 'bold' }} variant='p'>{data.booked.name}</Typography> 
            <Typography variant="body2" color="text.secondary" className='flex justify-between'><p>{data.booked.city},{data.booked.state} </p><p><p>{(new Date(Date.now()).getTime()>new Date(data.end.substring(6),data.end.substring(3,5),data.end.substring(0,2)).getTime())?<DoneAllIcon/>:null}</p></p> </Typography>
            <Typography variant="body2" color="text.secondary">{data.booked.bed===1? <span>{data.booked.bed} bed</span>:<span>{data.booked.bed} beds</span>}</Typography>
            <Typography>{data.booked.price.toLocaleString("hi-IN", {style:"currency", currency:"INR",minimumFractionDigits: 0,})}<span className='text-gray-500'> / night</span></Typography>
            <Typography sx={{fontSize:15}}><span className='font-bold text-xs'>TOTAL:</span> {data.booked.price.toLocaleString("hi-IN", {style:"currency", currency:"INR",minimumFractionDigits: 0,})} x {data.nights} {data.nights===1?"night":"nights"} = {(data.booked.price * data.nights).toLocaleString("hi-IN", {style:"currency", currency:"INR",minimumFractionDigits: 0,})}</Typography>
            <Typography sx={{fontSize:15}}><span className='font-bold text-xs'>CHECKIN: </span>{data.start} | <span className='font-bold text-xs'>CHECKOUT: </span>{data.end}</Typography>
          
        </CardContent>
      </Link>
    </Card>


    
    
  )
}
export default BookedCard;