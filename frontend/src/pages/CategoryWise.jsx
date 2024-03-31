import axios from 'axios'
import React, { useContext, useEffect ,useState} from 'react'
import SingleCard from '../components/SingleCard';
import { useParams } from 'react-router-dom';
import { userContext } from '../context/context';

const CategoryWise = () => {
    const {q}=useParams();
    const {filter}=useContext(userContext);
    const [places,setPlaces]=useState([]);
    useEffect(()=>{
        const fetching=async ()=>{
            const response= await axios.get(`${process.env.REACT_APP_SERVER_URL}/category/${q}?filter=${filter}`);
            setPlaces(response.data)
        }
        fetching();
        

    },[q,filter])
if(places.length>0){
    return (
        <div className='mt-4 px-4 lg:px-16 lg:mt-8'>
            <p>{filter!==0 && (filter<100001 ?<span className='text-sm text-gray-700'>Showing results [&le; {Number(filter).toLocaleString("hi-IN", {style:"currency", currency:"INR",minimumFractionDigits: 0,})}]</span>:<span>Showing results (&ge; {Number(filter-1).toLocaleString("hi-IN", {style:"currency", currency:"INR",minimumFractionDigits: 0,})})</span>)}</p>
            <p className='font-bold text-xl my-2'> {q} Category </p>
            <div className='grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8'>
                {places.map((item,index )=><SingleCard allowedit={false} data={item} key={index}/>)}
            </div>
        </div>
      )
}
else{
    return(
        <div className='px-2 mt-2 lg:px-32 lg:mt-8'>
            <p>{filter!==0 && (filter<100001 ?<span className='text-sm text-gray-700'>Showing results [&le; {Number(filter).toLocaleString("hi-IN", {style:"currency", currency:"INR",minimumFractionDigits: 0,})}]</span>:<span>Showing results (&ge; {Number(filter-1).toLocaleString("hi-IN", {style:"currency", currency:"INR",minimumFractionDigits: 0,})})</span>)}</p>
            <p className='font-bold text-xl my-2'> {q} Category </p>
            <p className='my-4'>Oops !</p>
            <img src="/noData.png" className='w-full h-[440px] lg:h-[550px]' alt="No Data"/>
        </div>
    )
}

  
}

export default CategoryWise