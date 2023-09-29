"use client"
import React, { useState } from 'react';

export default function LeftPane() {
  const [isOpen, setIsOpen] = useState(true);

  const togglePane = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full w-64 bg-white transform transition-transform ease-in-out duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-64'
      }`}
    >
      <button
        className="p-2 text-white bg-blue-500 absolute top-2 left-2 rounded-full"
        onClick={togglePane}
      >
        Toggle
      </button>
      <h2 className={`mb-3 text-2xl font-semibold`}>
        Left pane
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
    </div>
  );
}
