"use client"
import React, { useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import css from './index.module.css'
import { Panecard } from './panecard';
import {AiOutlineSearch} from 'react-icons/ai'
import {GiCancel} from 'react-icons/gi'

interface LeftPaneProps {
  setIsLeftPaneActive: Function
  data: any
  searchRef: React.RefObject<HTMLInputElement>
  fetchData: Function
}

export const LeftPane: React.FC<LeftPaneProps> = ({ setIsLeftPaneActive, data, searchRef, fetchData }) => {
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

      <div className='border-b-2 border-solid border-grey mx-4 mt-20 flex items-center justify-between'>
        <button 
          onClick={() => fetchData(searchRef.current?.value ?? "")}
        >
          <AiOutlineSearch size={16} />
        </button>
        <input className='w-full mx-2 outline-none'  ref={searchRef} />
        <button 
          onClick={() => {
            searchRef.current!.value = "";
            fetchData("")
        }}>
          <GiCancel size={16} />
        </button>
      </div>

      {/* <div className='m-16'/> */}
      <div className='m-8 mt-4' style={{ maxHeight: 'calc(100% - 60px)', overflowY: 'auto' }}>
        <div className="hide-scrollbar">
          {data.map((item: any) => <Panecard name={item.title} address={item.address.label} distance={item.distance / 1000} travelTime={item.travelTime}/>)}
        </div>
      </div>
    </div>
  );
}
