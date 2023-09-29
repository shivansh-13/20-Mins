"use client"
import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
export default function LeftPane() {
  const [isOpen, setIsOpen] = useState(true);

  const togglePane = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`fixed left-0 top-0 h-full w-64 bg-white transform transition-transform ease-in-out duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full' // Changed from -translate-x-64 to -translate-x-full
      }`}
    >
      <button
        className="p-2 text-white bg-blue-500 absolute top-2 left-2 rounded-full"
        onClick={togglePane}
      >
        <IoIosArrowBack/>
      </button>
    </div>
  );
}
