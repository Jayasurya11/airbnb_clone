import React, { useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { FaChevronLeft } from "react-icons/fa";
const ImagesPage = () => {
    const {id}=useParams();
    const [place,setPlaces]=useState();
    const [isloaded,setIsloaded]=useState(false);
    useEffect(()=>{
        const fetching= async ()=>{
            const data= await axios.get(`${process.env.REACT_APP_SERVER_URL}/place-by-id/${id}`);
            
            setPlaces(data.data);
            setIsloaded(true);
        }
        id && fetching();
    },[id]);
    if(!isloaded){
        return(<div className='w-screen flex justify-center items-center h-screen '><span class="loader2"></span></div>)
    }
    else{
        return (
            <div className='px-8 md:px-12 lg:px-16 mt-4'>
                <p className='flex gap-3 items-center font-bold '><Link className="hover:scale-125" to={`/place/${place?._id}`}><FaChevronLeft/></Link>{place?.name}</p>
                {place?.images?.map((item,index)=><img src={item} key={index}  className=' max-h-[350px] lg:max-h-[600px] w-screen my-3' alt="image"/>)}
            </div>
          )
    }
   

  
}

export default ImagesPage