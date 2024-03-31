import React, { useContext, useEffect, useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { FaKitchenSet ,FaUmbrellaBeach } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { PiTelevision } from "react-icons/pi";
import { BiFridge } from "react-icons/bi";
import { MdOutlinePets } from "react-icons/md";
import { GiCctvCamera } from "react-icons/gi";
import { FaFirstAid } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { GiWashingMachine } from "react-icons/gi";
import { MdOutlinePool } from "react-icons/md";
import { PiPlantBold } from "react-icons/pi";
import { MdHotTub } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaFireExtinguisher } from "react-icons/fa";
import GoogleMap from '../components/GoogleMap';
import dayjs from 'dayjs';
import { GiDesert } from "react-icons/gi";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { userContext } from '../context/context';

import { PiBowlFood } from "react-icons/pi";
import { BiSolidDryer } from "react-icons/bi";
import { MdCleaningServices,MdOutdoorGrill,MdOutlineIron , MdOutlineBalcony } from "react-icons/md";
import { LiaWaterSolid ,LiaMountainSolid } from "react-icons/lia";
import { GiRiver ,GiSwamp,GiFireplace} from "react-icons/gi";
import { RiAlarmWarningFill } from "react-icons/ri";
import { CgGym } from "react-icons/cg";
import toast from 'react-hot-toast';


const icons=[{icon:<FaKitchenSet/>, message:"Kitchen"},
            {icon:<FaWifi/>,message:"Wifi"},
            {icon: <FaCar/>,message:"Free Parking"},
            {icon:<PiTelevision/>,message:"Telivision"},
            {icon:<BiFridge/>,message:"Freezer"},
            {icon:<MdOutlinePets/>,message:"Pets Allowed"},
            {icon:<GiCctvCamera/>,message:"Security Camera"},
            {icon:<FaFirstAid/>,message:"First Aid Kit"},
            {icon:<GiWashingMachine/>,message:"Washing Machine"},
            {icon:<TbAirConditioning/>,message:"Air Conditioning"},
            {icon:<MdOutlinePool/>,message:"Pool"},
            {icon:<PiPlantBold/>,message:"Garden View"},
            {icon:<MdHotTub/>,message:"Hot Tub"},
            {icon:<BsPersonWorkspace/>,message:"Dedicated Workspace"},
            {icon:<FaFireExtinguisher/>,message:"Fire Extinguisher"},
            {icon:<GiDesert/>,message:"Desert View"},
            {icon:<PiBowlFood/>,message:"Breakfast"},
            {icon:<BiSolidDryer/>,message:"Dryer"},
            {icon:<FaUmbrellaBeach/>,message:"Beach View"},
            {icon:<GiFireplace/>,message:"Indoor Fireplace"},
            {icon:<MdOutlineBalcony/>,message:"Private patio or balcony"},
            {icon:<MdOutlineIron/>,message:"Iron"},
            {icon:<LiaMountainSolid/>,message:"Mountain View"},
            {icon:<MdOutdoorGrill/>,message:"BBQ Grill"},
            {icon:<MdCleaningServices/>,message:"Cleaning"},
            {icon:<LiaWaterSolid/>,message:"Sea View"},
            {icon:<GiRiver/>,message:"River View"},
            {icon:<GiSwamp/>,message:"Lake View"},
            {icon:<RiAlarmWarningFill/>,message:"Smoke Alarm"},
            {icon:<CgGym/>,message:"Gym"}];
const DetailsPage = () => {
    const {user}=useContext(userContext);
    const navigate=useNavigate();
    const {id}=useParams();
   const [checkin,setCheckin]=useState();
   const [checkout,setCheckout]=useState();
   const [nights,setNights]=useState();
   
   const handleDates=(e,val)=>{
        if(val==="checkin"){
            

            setCheckin(e);
            if( checkin && checkout){
                
                const start= new Date(checkin.$y, checkin.$M, checkin.$D);
                const end= new Date(checkout.$y, checkout.$M, checkout.$D);
                setNights((end-start)/86400000);
    
            }
        }
        else{
            setCheckout(e);
            
            
        }      
   }
   useEffect(()=>{
    if( checkin && checkout){
        
        const start= new Date(checkin.$y, checkin.$M, checkin.$D);
        const end= new Date(checkout.$y, checkout.$M, checkout.$D);
        setNights((end-start)/86400000);

    }
   },[checkin,checkout])
    
   const handleBooking=async ()=>{
    if(!user.name){
        navigate("/login");
        toast.error("Login to book");
    }
    else{
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/booking/${user.email}/${place._id}`,{st:{date:checkin.$D,month:checkin.$M, year:checkin.$y},en:{date:checkout.$D,month:checkout.$M,year:checkout.$y},nights});
        navigate("/booked-places");
    }
    
   }

   
    const [place,setPlace]=useState("");
    useEffect(()=>{
        const fetching= async ()=>{
            const data= await axios.get(`${process.env.REACT_APP_SERVER_URL}/place-by-id/${id}`);
            setPlace(data.data);
        }
        fetching();
},[id])
  return (
    <div className='px-4 lg:px-16 my-6'>
        {place?<div>
            <h2 className='text-2xl my-2 font-bold'>{place.name} | {place.category}</h2>
            
            <div className='grid grid-cols-4 gap-4'>
                {place.images.map((item,index)=>{
                    if(index===0) return <img className="row-span-2 col-span-2 h-full max-h-[400px] w-full" alt="" key={index} src={item} />
                    return(<img className="max-h-48 w-full" key={index} alt="" src={item}/>)})
                }
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-2 lg:gap-12 mt-4  lg:mb-8'>
                <div className='lg:col-span-3'>
                    <p className='font-bold text-xl'>{place.city},{place.state==="NA"?null:`${place.state},`}{place.country}</p>
                    <p>{place.guest} Guests . {place.bed} Beds . {place.bedroom} Bedrooms . {place.bathroom} Bathrooms</p>
                
                    <div className='border my-4  border-gray-300'></div>
                    <p className='text-xl my-4'>Hosted By {place.hosted_by}</p>
                    <div className='border border-gray-300'></div>
                    <p className='my-4'>{place.description}</p>
                    <div className='border border-gray-300'></div>
                    <p className='font-bold text-xl my-2'>What this place offers</p>
                    {place.benefits.map((num,index)=><p className='flex my-4 items-center gap-4' key={index}>{icons[num-1].icon}  {icons[num-1].message}</p>)}
                </div>
                <div className='lg:col-span-2'>
                    

                    <div className=' border-gray-300 border-2 rounded-xl  shadow-lg  my-2 lg:my-6 px-8 py-8'>
                        <p className='text-xl font-bold '>₹ {place.price.toLocaleString()} <span className='text-gray-500 font-semibold text-lg'>night </span></p>
                        <div className='flex w-full justify-between '>
                            
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                    <DemoItem label="CHECK-IN" >
                                    <DatePicker value={checkin} sx={{width:{xs:"260px",lg:"220px"}}} onChange={(e)=>handleDates(e,"checkin")} minDate={dayjs(Date.now())}
                                     maxDate={dayjs(Date.now()+86400000*30)}/>
                                    </DemoItem>
                                    <DemoItem label="CHECK-OUT">
                                    <DatePicker value={checkout} sx={{width:{xs:"260px",lg:"220px"}}}
                                    onChange={(e)=>handleDates(e,"checkout")}
                                    minDate={checkin?dayjs(new Date(checkin.$y,checkin.$M,checkin.$D).getTime()+86400000):dayjs(Date.now()+86400000)}  
                                    maxDate={checkin?dayjs(new Date(checkin.$y,checkin.$M,checkin.$D).getTime()+86400000*7):dayjs(Date.now()+86400000*7)}/>
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        {checkin && checkout ?<div className='flex flex-col'>
                            <div className='flex justify-between my-2 '><p>₹ {place.price.toLocaleString()} x {nights} nights = </p><p>₹ {(place.price*nights).toLocaleString()}</p></div>
                            
                        
                            <button className='border bg-blue-500 px-4 py-2' onClick={handleBooking}>Book</button>
                        </div>:null}
                        
                    </div>  
                    <GoogleMap city={place.city} state={place.state} country={place.country} loc={place.name}/>
                </div>
            </div>
        </div>

        :<div></div>}
        
    </div>
  )
}

export default DetailsPage




