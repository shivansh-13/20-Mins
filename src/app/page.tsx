"use client"
import React, { useState } from 'react';
import Map from '@/components/Map';


export default function Home() {
  const [isLeftPaneOpen, setIsLeftPaneOpen] = useState(false);

  const toggleLeftPane = () => {
    setIsLeftPaneOpen(!isLeftPaneOpen);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <Map />
      {/* <button
        className="bg-blue-500 text-white p-2 rounded-full absolute top-4 left-2"
        onClick={toggleLeftPane}
      >
        <RiMenu4Line />
      </button>
      <div className='flex flex-col ml-auto my-auto'>
        <button className='querybtn'>
          <MdOutlineRestaurant />
          Restaurants
        </button>
        <button className='querybtn'>
          <TbHotelService />
          Hotels
        </button>
        <button className='querybtn'>
          <HiOutlineCamera />
          Things to do
        </button>
        <button className='querybtn'>
          <MdOutlineDirectionsTransitFilled />
          Transit
        </button>
        <button className='querybtn'>
          <MdOutlineLocalHospital />
          Pharmacies
        </button>
        <button className='querybtn'>
          <MdAtm />
          ATM
        </button>

      </div>
      {isLeftPaneOpen && <LeftPane setIsLeftPaneActive={setIsLeftPaneOpen} />} */}
    </main>
  );
}
