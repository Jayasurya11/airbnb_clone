import React,{useContext, useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { FaKitchenSet ,FaUmbrellaBeach } from "react-icons/fa6";
import { FaWifi,FaCar ,FaFirstAid,FaFireExtinguisher } from "react-icons/fa";
import { PiTelevision ,PiPlantBold,PiBowlFood } from "react-icons/pi";
import { BiFridge ,BiSolidDryer} from "react-icons/bi";
import {  MdOutlinePets ,MdOutlinePool, MdHotTub,MdCleaningServices,MdOutdoorGrill,MdOutlineIron , MdOutlineBalcony} from "react-icons/md";
import { GiCctvCamera ,GiWashingMachine,GiDesert,GiRiver ,GiSwamp,GiFireplace} from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import { BsPersonWorkspace } from "react-icons/bs";
import { RiDeleteBinLine ,RiAlarmWarningFill } from "react-icons/ri";
import { userContext } from '../context/context';
import { LiaWaterSolid ,LiaMountainSolid } from "react-icons/lia";
import { CgGym } from "react-icons/cg";
import toast from 'react-hot-toast';
const EditPlace= () => {
    const [count,setCount]=useState(0);
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
    const {id}=useParams();
    const [place,setPlace]=useState({});

    useEffect(()=>{
        const fetching= async ()=>{
            const data= await axios.get(`${process.env.REACT_APP_SERVER_URL}/place-by-id/${id}`);
            setPlace(data.data);
           
            
        }
        !place.name && fetching();
        
        
        
        



    },[place,id]);
    
    const [images,setImages]=useState([]);
    const [image,setImage]=useState(" ");
    const [benefits,setBenefits]=useState([]);
    const [name,setName]=useState("");
    const [category,setCategory]=useState("Beach Front");
    const [city,setCity]=useState("");
    const [state,setState]=useState( "");
    const [country,setCountry]=useState("");
    const [description,setDescription]=useState( "");
    const [guest,setGuest]=useState(1);
    const [bedroom,setBedroom]=useState(1);
    const [bathroom,setBathroom]=useState(1);
    const [bed,setBed]=useState(1);
    const [price,setPrice]=useState( 0);
    const {user}=useContext(userContext);
    const navigate=useNavigate();



    if(place.name && count===0){
        place.name && setName(place.name) 
        place.description && setDescription(place.description)
        place.images && setImages(place.images) 
        place.guest && setGuest(place.guest)
        place.bathroom && setBathroom(place.bathroom) 
        place.bed && setBed(place.bed) 
        place.bathroom && setBathroom(place.bathroom)
        place.price  && setPrice(place.price) 
        place.city && setCity(place.city) 
        place.state && setState(place.state) 
        place.category && setCategory(place.category)
        place.country && setCountry(place.country)
        place.benefits && setBenefits(place.benefits);
        setCount(1);
    }


    const handleBenefits=(num)=>{
        
        if(benefits.includes(num)){
            const updated=benefits.filter((item)=>item!==num);
            setBenefits([...updated]);
        }
        else{
            setBenefits([...benefits,num])
        }
        

    }
    
    const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

        let benefits_list = [];

        numbers.forEach((num) => {
            if(benefits.includes(num)){
                benefits_list.push(
                    <div className='flex items-center gap-2'>
                        <input id={`benefit${num}`} type='checkbox'  checked className='text-green-600 bg-gray-100 border-gray-600 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' onChange={()=>handleBenefits(num)} />
                        <label className="text-xs lg:text-lg" htmlFor={`benefit${num}`} >{icons[num-1].icon} {icons[num-1].message}</label>
                    
                    </div>
                )

            }
            else{
                benefits_list.push(
                    <div className='flex items-center gap-2'>
                        <input id={`benefit${num}`} type='checkbox'  className='text-green-600 bg-gray-100 border-gray-600 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' onChange={()=>handleBenefits(num)} />
                        <label className="text-xs lg:text-lg" htmlFor={`benefit${num}`} >{icons[num-1].icon} {icons[num-1].message}</label>
                    
                    </div>
                )
            }
        
    });

    const handleImageUpload=()=>{
        image && setImages([...images,image])
        
        setImage(" ")
    }
    const handleRemove=(item)=>{
        const image_manage=images.filter((i)=>i!==item);
        
        setImages([...image_manage])
        
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/update-a-place/${place._id}`,{
            hosted_by:user?.name, email:user?.email, name,category, city, state, country, description, guest,bed,bathroom,bedroom, price,benefits,images
        });
        setName("");
        navigate("/host-a-place");
        setDescription("");
        setCity("");
        setState("");
        setCountry("");
        setGuest(1);
        setBed(1);
        setBedroom(1);
        setBathroom(1);
        setPrice(0);
        setImage(" ");
        setImages([]);
        setBenefits([]);
        
        
        toast.success("Updated")
    }
    
  return (
    <div className='w-screen'>
        
        <form className='flex flex-col gap-6 items-center justify-center  my-8 px-8 md:px-12  lg:px-16' onSubmit={handleSubmit}>
            <h1 className='font-bold text-2xl '>Update the Place</h1>
            <div className='w-full'>
                <label htmlFor='name' className='w-full font-bold'>Place Name</label>
                <input id="name" type="text" placeholder='Place Name' value={name} onChange={(e)=>setName(e.target.value)} className='min-w-screen min-w-full rounded-xl' required/>
            </div>
            
            <div className='w-full'>
                
                <div className='grid grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-2 w-full'>
                <div className=' col-span-3 grid grid-cols-3 row-span-2'>
                        <label htmlFor='location' className='font-bold col-span-3'>Location</label>
                        <div className='grid grid-cols-3 col-span-3'>
                            <input id="location" type="text" className='rounded-xl'  value={city} onChange={(e)=>setCity(e.target.value)} placeholder='City' required />
                            <input type="text"  className='rounded-xl' value={state} onChange={(e)=>setState(e.target.value)} placeholder='State' />
                            <input type="text"  className='rounded-xl' value={country} onChange={(e)=>setCountry(e.target.value)} placeholder='Country' required />
                        </div>
                    </div>
                    
                    <div className='col-span-2 lg:col-span-1 grid grid-cols-1'>
                    <label htmlFor='category' className='font-bold'>Category</label>
                    <select name="cars" id="category" value={category} onChange={(e)=>setCategory(e.target.value)} className='rounded-xl row-span-1' >
                        <option value="BeachFront">Beach Front</option>
                        <option value="Camping">Camping</option>
                        <option value="AmazingPools">Amazing Pools</option>
                        <option value="Cities">Cities</option>
                        <option value="Skiing">Skiing</option>
                        <option value="Countryside">Countryside</option>
                        <option value="Desert">Desert</option>
                        <option value="Lake">Lake</option>
                        <option value="Castle">Castle</option>

                    </select>
                    </div>
                </div>
                
            </div>
            <div className='w-full'>
                <label htmlFor='description' className='font-bold'>Description</label>
                <textarea id="description" value={description} onChange={(e)=>setDescription(e.target.value)} rows="2" className='w-full rounded-xl' required></textarea>
            </div>
            
            <div className='grid grid-cols-3 lg:grid-cols-5 gap-x-2 lg:gap-x-5 gap-y-1 w-full '>
            <div className='row-span-2 col-span-1 grid grid-cols-1 '>
                    <label className="font-bold " htmlFor='guest'>Guests</label>
                    <input id="guest" type='number' className='rounded-xl' value={guest} onChange={(e)=>setGuest(e.target.value)} min={1} placeholder='Guests' required/>
                </div>
                <div className='row-span-2 col-span-1 grid grid-cols-1'>
                    <label className="font-bold "  htmlFor='bedroom'>Bedrooms</label>
                    <input id="bedroom" type="number" className='rounded-xl' value={bedroom} onChange={(e)=>setBedroom(e.target.value)} min={1} placeholder='Bedrooms' required/>
                </div>
                <div className='row-span-2 col-span-1 grid grid-cols-1'>
                    <label className="font-bold "  htmlFor='bed'>Beds</label>
                    <input id="bed" type='number' className='rounded-xl' value={bed} onChange={(e)=>setBed(e.target.value)} placeholder='Beds' min={1} required/>
                </div>
                <div className='row-span-2 col-span-1 grid grid-cols-1'>
                    <label className="font-bold "  htmlFor='bathroom'>Bathrooms</label>
                    <input id="bathroom" type='number' className='rounded-xl' value={bathroom} onChange={(e)=>setBathroom(e.target.value)} min={1} placeholder='Bathrooms' required/>
                </div>
                <div className='row-span-2 col-span-1 grid grid-cols-1'>
                    <label className="font-bold "  htmlFor='price'>Price</label>
                    <input id="price" type='number' className='rounded-xl' value={price} onChange={(e)=>setPrice(e.target.value)} min={1} required placeholder='Price/Night'/>
                </div>

            </div>
            <div className='flex w-full flex-col'>
                <label htmlFor="image w-full" className='font-bold'>Images</label>
                <div className='flex gap-2'>
                    <input id="image" type="text" placeholder='Image Link' value={image} onChange={(e)=>setImage(e.target.value)} className='min-w-screen w-full rounded-xl' required/>
                    <button type='button' onClick={handleImageUpload} className=' border-gray-600 border-2  bg-gray-300 rounded-md px-2 py-1 '>Add</button>

                </div>
                
            </div>
            { images.length>0?(  
            <div className='grid grid-cols-3 lg:grid-cols-5 gap-4 w-full'>
                {images.map((item)=>{
                    return(
                    <div className='relative'>
                        <img src={item} className='w-full' alt="" height="100px"/>
                        <button type="button" className="absolute top-1 right-1 bg-gray-200 rounded-full p-2" onClick={()=>handleRemove(item)} ><RiDeleteBinLine /></button>
                    </div>
                    
                    )
                })}
            </div>):null
                
            }
            <div className='w-full '>
                <h3 className='font-bold py-4'>Benefits</h3>
                <div className='grid grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-6'>
                    
                    {benefits_list}
                </div>
                
            </div>
            

            
            <button type='submit' className='px-4 py-2 bg-red-600 text-white font-bold'>Update</button>
        </form>
    </div>
  )
}

export default EditPlace