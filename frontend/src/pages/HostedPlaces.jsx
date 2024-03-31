import axios from 'axios'
import React, { useContext, useEffect ,useState} from 'react'
import SingleCard from '../components/SingleCard';
import { userContext } from '../context/context';

const HostedPlaces = () => {
    const [places,setPlaces]=useState([]);
    const {user}=useContext(userContext);
    useEffect(()=>{
        const fetching=async ()=>{
            const response= await axios.get(`${process.env.REACT_APP_SERVER_URL}/hosted-places/${user?.email}`);
            
            setPlaces(response.data)
            

        }
        fetching();

    },[])
    if(places.length>0){
        return (
            <div className='w-100 mt-4 w-screen px-4 lg:px-16 lg:mt-8'>
                <h2 className='font-bold text-xl my-2'>Hosted by {user?.name}</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8'>
                    {places.map((item,index)=><SingleCard allowedit={true} data={item} key={index}/>)}
                </div>
            </div>
          )
    }
    else{
        return(
            <div className='px-2 mt-2 lg:px-32 lg:mt-8'>
            <h2 className='font-bold text-xl my-2'>Booked by you</h2>
           
            <img src="/noData.png" className='w-screen h-[440px] lg:h-[550px]' alt="No Places"/>
        </div>
        )
    }
  
}

export default HostedPlaces