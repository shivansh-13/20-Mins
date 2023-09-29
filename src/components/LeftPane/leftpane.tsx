"use client"
import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import css from './index.module.css'
import { Panecard } from './panecard';

interface LeftPaneProps {
  setIsLeftPaneActive: Function
  data: any
}

export const LeftPane: React.FC<LeftPaneProps> = ({ setIsLeftPaneActive, data }) => {
  const [isOpen, setIsOpen] = useState(true);
  const togglePane = () => {
    setIsOpen(!isOpen);
    setTimeout(() => setIsLeftPaneActive(false), 0.4 * 1000)
  };
  return (
    <div
      className={`text-black fixed mx-2 my-4 left-0 top-0 h-full w-96 rounded-xl bg-white transform transition-transform ease-in-out duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full' // Changed from -translate-x-64 to -translate-x-full
        }`}
    >
      <button
        className="p-3 text-lg flex items-center text-white bg-blue-500 absolute top-4 left-2 rounded-full z-99"
        onClick={togglePane}
      >
        <IoIosArrowBack  className="mr-2 text-2xl" />
        Googlemaps
      </button>

      {/* <div className='m-16'/> */}
      <div className='m-8 mt-16' style={{ maxHeight: 'calc(100% - 60px)', overflowY: 'auto' }}>
        <div className="hide-scrollbar">
          {data.map((item: any) => <Panecard name={item.title} address={item.address.label} distance={item.distance / 1000} travelTime={item.travelTime}/>)}
        </div>
      </div>
    </div>
  );
}
