import axios from 'axios'
import React, { useContext, useEffect ,useState} from 'react'

import { userContext } from '../context/context';
import BookedCard from '../components/BookedCard';

const BookedPlaces = () => {
    const [places,setPlaces]=useState([]);
    const {user}=useContext(userContext);
    const [isloaded,setIsloaded]=useState(false);
    useEffect(()=>{
      if(user.name){
        const fetching=async ()=>{
          const response= await axios.get(`${process.env.REACT_APP_SERVER_URL}/booked-places/${user.email}`);
          
          setPlaces(response.data.places)
          setIsloaded(true);
      }
      fetching();
      }
    },[])
    if(!isloaded){
      return(<div className='w-screen grid grid-cols-1 my-8 md:grid-cols-2 h-screen lg:grid-cols-4 px-8 py-6 md:px-12 lg:px-16 gap-x-4 gap-y-8 '>
      <span className="grid-cols-1 w-full loader"></span>
      <span className="grid-cols-1 w-full loader"></span>
      <span className="grid-cols-1 w-full loader"></span>
      <span className="grid-cols-1 w-full loader"></span>
      <span className="grid-cols-1 w-full loader"></span>
      <span className="grid-cols-1 w-full loader"></span>
      <span className="grid-cols-1 w-full loader"></span>
      <span className="grid-cols-1 w-full loader"></span>
  </div>)
    }
    else{
      if(places.length===0){
        return(
          <div className='px-4 md:px-12  mt-2 lg:px-16 min-h-screen lg:mt-8'>
                <h2 className='font-bold text-xl my-2'>Booked by you</h2>
               
                <img src="/noData.png" className='w-screen h-[440px] lg:h-[550px]' alt="No Data"/>
            </div>
        )
      }
      else{
        return (
          <div className='w-100 mt-4 min-h-screen w-screen px-8 md:px-12 lg:px-16 lg:mt-8'>
              <h2 className='font-bold text-xl my-2'>Booked by you</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8'>
                {places.reverse().map((item,index)=><BookedCard data={item} key={index}/>)}
                
                 
              </div>
              
          </div>
          
        )
      }
    }
  
  

}

export default BookedPlaces