"use client"
import React, { useState } from 'react';
import Map from '@/components/Map';
import { RiMenu4Line } from 'react-icons/ri';
import { MdOutlineRestaurant, MdOutlineDirectionsTransitFilled, MdOutlineLocalHospital, MdAtm } from 'react-icons/md';
import { LeftPane } from '@/components/LeftPane/leftpane';
import { TbHotelService } from 'react-icons/tb';
import { HiOutlineCamera } from 'react-icons/hi';

export default function Home() {
  const [isLeftPaneOpen, setIsLeftPaneOpen] = useState(false);

  const toggleLeftPane = () => {
    setIsLeftPaneOpen(!isLeftPaneOpen);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between">
      <Map />
      <button
        className="bg-blue-500 text-white p-2 rounded-full absolute top-4 left-2"
        onClick={toggleLeftPane}
      >
        <RiMenu4Line />
      </button>
      <div className="absolute top-4 right-2 flex flex-col">
        <button className="querybtn">
          <MdOutlineRestaurant />
          Restaurants
        </button>
        <button className="querybtn">
          <TbHotelService />
          Hotels
        </button>
        <button className="querybtn">
          <HiOutlineCamera />
          Things to do
        </button>
        <button className="querybtn">
          <MdOutlineDirectionsTransitFilled />
          Transit
        </button>
        <button className="querybtn">
          <MdOutlineLocalHospital />
          Pharmacies
        </button>
        <button className="querybtn">
          <MdAtm />
          ATM
        </button>
      </div>
      {isLeftPaneOpen && <LeftPane setIsLeftPaneActive={setIsLeftPaneOpen} />}
    </main>
  );
}
