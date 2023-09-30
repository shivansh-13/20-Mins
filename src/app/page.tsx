"use client"
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Map from '@/components/Map';
import { RiMenu4Line } from 'react-icons/ri';
import { MdOutlineRestaurant, MdOutlineDirectionsTransitFilled, MdOutlineLocalHospital, MdAtm } from 'react-icons/md';
import { LeftPane } from '@/components/LeftPane/leftpane';
import { TbHotelService } from 'react-icons/tb';
import { HiOutlineCamera } from 'react-icons/hi';
import { IoMdOptions } from 'react-icons/io';

export default function Home() {
  const [isLeftPaneOpen, setIsLeftPaneOpen] = useState(false);
  const [apiData, setApiData] = useState([]);

  const searchRef = useRef<HTMLInputElement>(null)
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(20); // Initial slider value
  const [selectedOption, setSelectedOption] = useState('time');
  const [isApiLoading, setIsApiLoading] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const changeMode = () => {
    setIsDarkMode(!isDarkMode);
  }
  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  const toggleLeftPane = () => {
    setIsLeftPaneOpen(!isLeftPaneOpen);
  };
  const handleSliderChange = (event: any) => {
    setSliderValue(event.target.value);
  };

  const fetchData = async (service: string) => {
    setIsApiLoading(true);
    try {
      const latlin = JSON.parse(localStorage.getItem('lat') ?? "[0,0]");
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/?loc=${latlin[0]},${latlin[1]}&rangeType=${selectedOption}&rangeValue=${sliderValue}&transport=car&service=${service}`);
      const data = response.data;
      setApiData(data);
      console.log(data)
    } catch (error) {
      console.error('An error occurred:', error);
    }finally{
      setIsApiLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between">
      <Map data={apiData} mode={isDarkMode} />
      <button
        className="bg-blue-500 text-lg text-white p-3 rounded-full absolute top-4 left-2 flex items-center mx-2 my-4 "
        onClick={toggleLeftPane}
      >
        <RiMenu4Line className="mr-2 text-2xl" />
        Googlemaps
      </button>

      <div className="absolute top-4 right-2 flex flex-col">
        <button className="querybtn " onClick={async () => { 
            fetchData("food"); 
            if(!isLeftPaneOpen) toggleLeftPane(); 
            let interval = setInterval(() => 
            {
              if(searchRef.current != null)
              {
                setTimeout(() => searchRef.current!.value = "food", 0.5 * 1000);
                clearInterval(interval);
              }
            }, 0.1 * 1000) }
          }>
          <MdOutlineRestaurant  className="text-[#00A1F1] text-xl"/>
          Restaurants
        </button>
        <button className="querybtn" onClick={async () => { 
            fetchData("hotel"); 
            if(!isLeftPaneOpen) toggleLeftPane(); 
            let interval = setInterval(() => 
            {
              if(searchRef.current != null)
              {
                setTimeout(() => searchRef.current!.value = "hotel", 0.5 * 1000);
                clearInterval(interval);
              }
            }, 0.1 * 1000) }
          }>
          <TbHotelService  className="text-[#F65314] text-xl"/>
          Hotels
        </button>
        <button className="querybtn" onClick={async () => { 
            fetchData("entertainment"); 
            if(!isLeftPaneOpen) toggleLeftPane(); 
            let interval = setInterval(() => 
            {
              if(searchRef.current != null)
              {
                setTimeout(() => searchRef.current!.value = "entertainment", 0.5 * 1000);
                clearInterval(interval);
              }
            }, 0.1 * 1000) }
          }>
          <HiOutlineCamera  className="text-[#FFBB00] text-xl"/>
          Things to do
        </button>
        <button className="querybtn" onClick={async () => { 
            fetchData("localtransit"); 
            if(!isLeftPaneOpen) toggleLeftPane(); 
            let interval = setInterval(() => 
            {
              if(searchRef.current != null)
              {
                setTimeout(() => searchRef.current!.value = "localtransit", 0.5 * 1000);
                clearInterval(interval);
              }
            }, 0.1 * 1000) }
          }>
          <MdOutlineDirectionsTransitFilled  className="text-[#00A1F1] text-xl"/>
          Transit
        </button>
        <button className="querybtn" onClick={async () => { 
            fetchData("pharmacy"); 
            if(!isLeftPaneOpen) toggleLeftPane(); 
            let interval = setInterval(() => 
            {
              if(searchRef.current != null)
              {
                setTimeout(() => searchRef.current!.value = "pharmacy", 0.5 * 1000);
                clearInterval(interval);
              }
            }, 0.1 * 1000) }
          }>
          <MdOutlineLocalHospital  className="text-[#7CBB00] text-xl"/>
          Pharmacies
        </button>
        <button className="querybtn" onClick={async () => { 
            fetchData("atm"); 
            if(!isLeftPaneOpen) toggleLeftPane(); 
            let interval = setInterval(() => 
            {
              if(searchRef.current != null)
              {
                setTimeout(() => searchRef.current!.value = "atm", 0.5 * 1000);
                clearInterval(interval);
              }
            }, 0.1 * 1000) }
          }>
          <MdAtm  className="text-[#F65314] text-xl"/>
          ATM
        </button>
        <button className="querybtn" onMouseEnter={showPopup} onMouseLeave={hidePopup}>
          <IoMdOptions className="text-[#F65314] text-xl" />
          Filters
          {isPopupVisible && (
            <div className="popup">
              <p> Places within {sliderValue} {selectedOption === "time" ? "mins" : "km"}</p>
              <input
                type="range"
                min="5"
                max="120"
                value={sliderValue}
                onChange={handleSliderChange}
              />
              <div className="radios ">
                <label className='mr-5'>
                  <input
                    type="radio"
                    name="option"
                    value="time"
                    checked={selectedOption === "time"}
                    onChange={() => setSelectedOption("time")}
                  />
                 Time
                </label>
                <label>
                  <input
                    type="radio"
                    name="option"
                    value="distance"
                    checked={selectedOption === "distance"}
                    onChange={() => setSelectedOption("distance")}
                  />
                 Distance
                </label>
              </div>
            </div>
          )}

        </button>
      </div>
      <div className="dark-mode-toggle  absolute top-[92vh] left-[1vw]">
      <label className="switch">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={changeMode}
        />
        <span className="slider"></span>
      </label>
      <span className={`mode-label ${isDarkMode ? 'dark' : 'light'}`}>
        {isDarkMode ? 'Dark' : 'Light'} Mode
      </span>
    </div>
      {isLeftPaneOpen && <LeftPane fetchData={fetchData} searchRef={searchRef} data={apiData} setIsLeftPaneActive={setIsLeftPaneOpen} isApiLoading={isApiLoading} />}
    </main>
  );
}
