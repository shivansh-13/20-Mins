"use client"
import React, { useState } from 'react';
import { RiMenu4Line } from 'react-icons/ri';
import { MdOutlineRestaurant } from 'react-icons/md';
import { MdOutlineDirectionsTransitFilled } from 'react-icons/md';
import { MdOutlineLocalHospital } from 'react-icons/md';
import { MdAtm } from 'react-icons/md';
import { TbHotelService } from 'react-icons/tb';
import { HiOutlineCamera } from 'react-icons/hi';

import LeftPane from './leftpane';


export default function Home() {
  const [isLeftPaneOpen, setIsLeftPaneOpen] = useState(false);

  const toggleLeftPane = () => {
    setIsLeftPaneOpen(!isLeftPaneOpen);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        className="bg-blue-500 text-white p-2 rounded-full absolute top-2 left-2"
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
      {isLeftPaneOpen && <LeftPane />}
    </main>
  );
}
