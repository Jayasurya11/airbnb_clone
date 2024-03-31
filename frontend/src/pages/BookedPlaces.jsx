import axios from 'axios'
import React, { useContext, useEffect ,useState} from 'react'

import { userContext } from '../context/context';
import BookedCard from '../components/BookedCard';

const BookedPlaces = () => {
    const [places,setPlaces]=useState([]);
    const {user}=useContext(userContext);
    useEffect(()=>{
      if(user.name){
        const fetching=async ()=>{
          const response= await axios.get(`${process.env.REACT_APP_SERVER_URL}/booked-places/${user.email}`);
          
          setPlaces(response.data.places)
          
          console.log(response)
      }
      fetching();
      }
        

    },[])
  if(places.length===0){
    return(
      <div className='px-2 mt-2 lg:px-32 lg:mt-8'>
            <h2 className='font-bold text-xl my-2'>Booked by you</h2>
           
            <img src="/noData.png" className='w-screen h-[440px] lg:h-[550px]' alt="No Data"/>
        </div>
    )
  }
  else{
    return (
      <div className='w-100 mt-4 w-screen px-4 lg:px-16 lg:mt-8'>
          <h2 className='font-bold text-xl my-2'>Booked by you</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8'>
            {places.reverse().map((item,index)=><BookedCard data={item} key={index}/>)}
            
             
          </div>
          
      </div>
      
    )
  }
  

}

export default BookedPlaces