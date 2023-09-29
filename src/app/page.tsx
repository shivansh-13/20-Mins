"use client"
import React, { useState } from 'react';
import { RiMenu4Line } from 'react-icons/ri';
import { MdOutlineRestaurant } from 'react-icons/md';
import { MdOutlineDirectionsTransitFilled } from 'react-icons/md';
import { MdOutlineLocalHospital } from 'react-icons/md';
import { MdAtm } from 'react-icons/md';
import { TbHotelService } from 'react-icons/tb';
import { HiOutlineCamera } from 'react-icons/hi';

import { MapContainer } from 'react-leaflet'
import { TileLayer } from 'react-leaflet'
import { useMap, Popup, Marker } from 'react-leaflet'

import LeftPane from './leftpane';


export default function Home() {
  const [isLeftPaneOpen, setIsLeftPaneOpen] = useState(false);

  const toggleLeftPane = () => {
    setIsLeftPaneOpen(!isLeftPaneOpen);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
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
      {isLeftPaneOpen && <LeftPane />} */}
    </main>
  );
}
