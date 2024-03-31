import axios from 'axios'
import React, { useContext, useEffect ,useState} from 'react'
import SingleCard from '../components/SingleCard';


import { userContext } from '../context/context';

const Listings = () => {
    
    const [places,setPlaces]=useState([]);
    const {filter}=useContext(userContext);
    useEffect(()=>{
        const fetching=async ()=>{
            const response= await axios.get(`${process.env.REACT_APP_SERVER_URL}/all-places?filter=${filter}`);
            setPlaces(response.data)
        }
        fetching();

    },[filter])
  return (

    <div className=' w-100 mt-4 w-screen px-4 lg:px-16 lg:mt-8'>
        
        <p>{filter!==0 && (filter<100001 ?<span className='text-sm text-gray-700'>Showing results [&le; {Number(filter).toLocaleString("hi-IN", {style:"currency", currency:"INR",minimumFractionDigits: 0,})}]</span>:<span>Showing results (&ge; {Number(filter-1).toLocaleString("hi-IN", {style:"currency", currency:"INR",minimumFractionDigits: 0,})})</span>)}</p>
        <h2 className='font-bold text-xl '>All Available Places</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8'>
            {places.map((item,index)=><SingleCard allowedit={false} data={item} key={index}/>)}
        </div>
    </div>
  )
}

export default Listings