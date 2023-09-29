"use client"
import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import css from './index.module.css'

interface LeftPaneProps {
  setIsLeftPaneActive: Function
}

export const LeftPane : React.FC<LeftPaneProps> = ({setIsLeftPaneActive}) => {
  const [isOpen, setIsOpen] = useState(true);
  const togglePane = () => {
    setIsOpen(!isOpen);
    setTimeout(() => setIsLeftPaneActive(false), 1 * 1000)
  };
  return (
    <div
      className={`fixed left-0 top-0 h-full w-72 bg-white -translate-x-full transform transition-transform ease-in-out duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full' // Changed from -translate-x-64 to -translate-x-full
        }`}
    >
      <button
        className="p-2 text-white bg-blue-500 absolute top-4 left-2 rounded-full" 
        onClick={togglePane}
      >
        <IoIosArrowBack />
      </button>
      <div className='m-12'>

      </div>
      <div className='flex justify-between p-5 border-b-2'>
        <div>
          <div>
            NAME
          </div>
          <div>
            ADDRESS
          </div>
        </div>
        <div className='text-green'>
          ETA
        </div>
      </div>
    </div>
  );
}