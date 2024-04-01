import axios from 'axios'
import React, { useContext, useEffect ,useState} from 'react'
import SingleCard from '../components/SingleCard';

import { SlArrowUp } from "react-icons/sl";
import { userContext } from '../context/context';

const Listings = () => {
    const[isloaded,setIsLoaded]=useState(false);
    const [places,setPlaces]=useState([]);
    const {filter}=useContext(userContext);
    const [showButton,setShowButton]=useState(false);
    useEffect(()=>{
        const fetching=async ()=>{
            const response= await axios.get(`${process.env.REACT_APP_SERVER_URL}/all-places?filter=${filter}`);
            setPlaces(response.data)
            setIsLoaded(true);      
        }
        fetching();
        const handleScrollButtonVisibility=()=>{
            window.pageYOffset>500?setShowButton(true):setShowButton(false);
        }
        window.addEventListener("scroll",handleScrollButtonVisibility);
        return()=>{
            window.removeEventListener("scroll",handleScrollButtonVisibility)
        }

    },[filter])
    const handleScrollToTop=()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    }
    
        
        if(!isloaded){
            return (<div className='w-screen grid grid-cols-1 my-8 md:grid-cols-2 h-screen lg:grid-cols-4 px-8 py-6 md:px-12 lg:px-16 gap-x-4 gap-y-8 '>
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
            return (
                <div className=' w-100 mt-4 w-screen px-8 md:px-12 lg:px-16 lg:mt-8 my-8'>
                    
                    <p>{filter!==0 && (filter<100001 ?<span className='text-sm text-gray-700'>Showing results [&le; {Number(filter).toLocaleString("hi-IN", {style:"currency", currency:"INR",minimumFractionDigits: 0,})}]</span>:<span>Showing results (&ge; {Number(filter-1).toLocaleString("hi-IN", {style:"currency", currency:"INR",minimumFractionDigits: 0,})})</span>)}</p>
                    <h2 className='font-bold text-xl '>All Available Places</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8'>
                        {places.map((item,index)=><SingleCard allowedit={false} data={item} key={index}/>)}
                        </div>
                    {showButton &&(
                        <div className="scrollToTop">
                            <button className='fixed bottom-20 right-3 lg:right-2 z-50 cursor-pointer p-2 text-lg font-bold border-2 shadow-2xl rounded-full border-gray-700 hover:scale-105' onClick={handleScrollToTop}>
                                 <SlArrowUp/>
                            </button>

                        </div>
                    )}
                </div>
              ) 
        }
        
        }
        
    
  
export default Listings