"use client"
import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import css from './index.module.css'
import { Panecard } from './panecard';

interface LeftPaneProps {
  setIsLeftPaneActive: Function
  data: any
}

export const LeftPane : React.FC<LeftPaneProps> = ({setIsLeftPaneActive, data}) => {
  const [isOpen, setIsOpen] = useState(true);
  const togglePane = () => {
    setIsOpen(!isOpen);
    setTimeout(() => setIsLeftPaneActive(false), 0.4 * 1000)
  };
  return (
    <div
      className={`text-black fixed left-0 top-0 h-full w-80 bg-white transform transition-transform ease-in-out duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full' // Changed from -translate-x-64 to -translate-x-full
        }`}
    >
      <button
        className="p-2 text-white bg-blue-500 absolute top-4 left-2 rounded-full z-99" 
        onClick={togglePane}
      >
        <IoIosArrowBack />
      </button>
      <div className='m-12'>
        {data.map((item:any) => <Panecard name={item.title} address={item.address.label+item.address.district+item.address.postalcode} distance={item.distance/1000} />)}
      </div>
    </div>
  );
}
