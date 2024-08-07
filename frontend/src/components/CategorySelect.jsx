import React, { useContext } from "react";
import { FaUmbrellaBeach } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { GiDesert, GiForest } from "react-icons/gi";
import { GiSwamp } from "react-icons/gi";
import { Link, Outlet } from "react-router-dom";
import { MdOutlinePool } from "react-icons/md";
import { GiFarmer } from "react-icons/gi";
import { GiModernCity } from "react-icons/gi";
import { FaPersonSkiing } from "react-icons/fa6";
import { GiCampingTent } from "react-icons/gi";
import TuneIcon from "@mui/icons-material/Tune";
import { GiVillage } from "react-icons/gi";
import { MdOutlineForest } from "react-icons/md";
import { userContext } from "../context/context";
import { GiCastle } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";
const CategorySelect = () => {
  const { setFilter } = useContext(userContext);
  return (
    <div>
      <div className="grid grid-cols-9 w-screen px-8 md:px-12 lg:px-16 my-2 ">
        <div className="scrollmenu col-span-7 lg:col-span-8 ">
          <Link to="/" className=" border border-gray-300 rounded-md">
            <div className='flex flex-row justify-center items-center w-["80px"] lg:min-w-["150px"]  lg:px-8 text-xs md:text-sm  gap-1 lg:gap-2 lg:text-md'>
              All
            </div>
          </Link>
          <Link
            to="/category/BeachFront"
            className=" border border-gray-300 rounded-md"
          >
            <div className='flex flex-row justify-center items-center w-["80px"] lg:min-w-["150px"] gap-1 lg:px-8 text-xs md:text-sm  lg:gap-2  lg:text-md'>
              <FaUmbrellaBeach />
              Beach Front
            </div>
          </Link>
          <Link
            to="/category/AmazingPools"
            className="border border-gray-300 rounded-md"
          >
            <div className='flex flex-row justify-center items-center w-["80px"] lg:min-w-["150px"] gap-1 lg:px-8 text-xs md:text-sm  lg:gap-2 lg:text-md'>
              <MdOutlinePool /> Amazing Pools
            </div>
          </Link>
          <Link
            to="/category/Cities"
            className="border border-gray-300 rounded-md"
          >
            <div className='flex flex-row justify-center items-center w-["80px"] lg:min-w-["150px"]  lg:px-8 text-xs md:text-sm   gap-1 lg:gap-2 lg:text-md'>
              <GiModernCity /> Iconic Cities
            </div>
          </Link>
          <Link
            to="/category/Luxury"
            className="border border-gray-300 rounded-md"
          >
            <div className='flex flex-row justify-center items-center w-["80px"] lg:min-w-["150px"] lg:px-8 text-xs md:text-sm  gap-1 lg:gap-2 lg:text-md'>
              <IoDiamondOutline /> Luxury
            </div>
          </Link>
          <Link
            to="/category/Skiing"
            className="border border-gray-300 rounded-md"
          >
            <div className='flex flex-row justify-center items-center w-["80px"] lg:min-w-["150px"]  lg:px-8 text-xs md:text-sm  gap-1 lg:gap-2 lg:text-md'>
              <FaPersonSkiing /> Skiing
            </div>
          </Link>
          <Link
            to="/category/Desert"
            className="border border-gray-300 rounded-md"
          >
            <div className='flex flex-row justify-center items-center w-["80px"] lg:min-w-["150px"]  lg:px-8 text-xs md:text-sm  gap-1 lg:gap-2 lg:text-md'>
              <GiDesert /> Desert
            </div>
          </Link>
          <Link
            to="/category/Lake"
            className="border border-gray-300 flex rounded-md"
          >
            <div className='flex flex-row justify-center items-center w-["80px"] lg:min-w-["150px"]  lg:px-8 text-xs md:text-sm  gap-1 lg:gap-2 lg:text-md'>
              <GiSwamp /> Lake{" "}
            </div>
          </Link>
          <Link
            to="/category/Camping"
            className="border border-gray-300 rounded-md"
          >
            <div className='flex flex-row justify-center items-center w-["80px"] lg:min-w-["150px"]  lg:px-8 text-xs md:text-sm  gap-1 lg:gap-2 lg:text-md'>
              <GiVillage /> Camping
            </div>
          </Link>
          <Link
            to="/category/Countryside"
            className="border border-gray-300 rounded-md"
          >
            <div className='flex flex-row justify-center items-center w-["80px"] lg:min-w-["150px"] lg:px-8 text-xs md:text-sm  gap-1 lg:gap-2 lg:text-md'>
              <GiCampingTent /> Countryside
            </div>
          </Link>
          <Link
            to="/category/Castle"
            className="border border-gray-300 rounded-md"
          >
            <div className='flex flex-row justify-center items-center w-["80px"] lg:min-w-["150px"] lg:px-8 text-xs md:text-sm  gap-1 lg:gap-2 lg:text-md'>
              <GiCastle /> Castle
            </div>
          </Link>
          <Link
            to="/category/NationalParks"
            className="border border-gray-300 rounded-md"
          >
            <div className='flex flex-row justify-center items-center w-["80px"] lg:min-w-["150px"] lg:px-8 text-xs md:text-sm  gap-1 lg:gap-2 lg:text-md'>
              <MdOutlineForest /> National Parks
            </div>
          </Link>
          <Link
            to="/category/Farms"
            className="border border-gray-300 rounded-md"
          >
            <div className='flex flex-row justify-center items-center w-["80px"] lg:min-w-["150px"] lg:px-8 text-xs md:text-sm  lg:gap-2 gap-1 '>
              <GiFarmer /> Farms
            </div>
          </Link>
        </div>

        <Dropdown
          label=""
          renderTrigger={() => (
            <span className="text-xs md:text-sm lg:text-md flex justify-center items-center rounded-xl border border-gray-800 py-2  hovereffect col-span-2 lg:col-span-1">
              <TuneIcon
                sx={{ fontSize: { xs: "16px", md: "18px", lg: "20px" } }}
              />{" "}
              Filters
            </span>
          )}
          dismissOnClick={true}
        >
          <Dropdown.Item
            className=" flex justify-center items-center"
            onClick={(e) => setFilter(0)}
          >
            Clear Filters
          </Dropdown.Item>
          <Dropdown.Item
            className=" flex justify-center items-center"
            onClick={(e) => setFilter(5000)}
          >
            &lt; 5k
          </Dropdown.Item>
          <Dropdown.Item
            className="flex justify-center items-center"
            onClick={(e) => setFilter(10000)}
          >
            &lt; 10k
          </Dropdown.Item>
          <Dropdown.Item
            className="flex justify-center items-center"
            onClick={(e) => setFilter(20000)}
          >
            &lt; 20k
          </Dropdown.Item>
          <Dropdown.Item
            className="flex justify-center items-center"
            onClick={(e) => setFilter(30000)}
          >
            &lt; 30k
          </Dropdown.Item>
          <Dropdown.Item
            className="flex justify-center items-center"
            onClick={(e) => setFilter(50000)}
          >
            &lt; 50k{" "}
          </Dropdown.Item>
          <Dropdown.Item
            className="flex justify-center items-center"
            onClick={(e) => setFilter(100000)}
          >
            &lt; 100k{" "}
          </Dropdown.Item>
          <Dropdown.Item
            className="flex justify-center items-center"
            onClick={(e) => setFilter(100001)}
          >
            &gt; 100k{" "}
          </Dropdown.Item>
        </Dropdown>
      </div>
      <Outlet />
    </div>
  );
};

export default CategorySelect;
