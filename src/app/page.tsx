"use client"
import React, { useState, useEffect } from 'react';
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
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(20); // Initial slider value
  const [selectedOption, setSelectedOption] = useState('Time');
  const showPopup = () => {
    setIsPopupVisible(true);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  const toggleLeftPane = () => {
    setIsLeftPaneOpen(!isLeftPaneOpen);
  };
  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const fetchData = async (service: string) => {

    try {
      const latlin = JSON.parse(localStorage.getItem('lat') ?? "[0,0]");
      const response = await axios.get(`http://localhost:5000/?loc=${latlin[0]},${latlin[1]}&rangeType=time&rangeValue=20&transport=car&service=${service}`);
      const data = response.data;
      setApiData(data);
      console.log(data)
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between">
      <Map data={apiData} />
      <button
        className="bg-blue-500 text-lg text-white p-3 rounded-full absolute top-4 left-2 flex items-center mx-2 my-4 "
        onClick={toggleLeftPane}
      >
        <RiMenu4Line className="mr-2 text-2xl" />
        Googlemaps
      </button>

      <div className="absolute top-4 right-2 flex flex-col">
        <button className="querybtn " onClick={async () => { await fetchData('food'); toggleLeftPane() }}>
          <MdOutlineRestaurant className="text-[#00A1F1] text-xl" />
          Restaurants
        </button>
        <button className="querybtn" onClick={async () => { await fetchData('hotel'); toggleLeftPane() }}>
          <TbHotelService className="text-[#F65314] text-xl" />
          Hotels
        </button>
        <button className="querybtn" onClick={async () => { await fetchData('entertainment'); toggleLeftPane() }}>
          <HiOutlineCamera className="text-[#FFBB00] text-xl" />
          Things to do
        </button>
        <button className="querybtn" onClick={async () => { await fetchData('localtransit'); toggleLeftPane() }}>
          <MdOutlineDirectionsTransitFilled className="text-[#00A1F1] text-xl" />
          Transit
        </button>
        <button className="querybtn" onClick={async () => { await fetchData('pharmacy'); toggleLeftPane() }}>
          <MdOutlineLocalHospital className="text-[#7CBB00] text-xl" />
          Pharmacies
        </button>
        <button className="querybtn" onClick={async () => { await fetchData('atm'); toggleLeftPane() }}>
          <MdAtm className="text-[#F65314] text-xl" />
          ATM
        </button>
        <button className="querybtn" onMouseEnter={showPopup} onMouseLeave={hidePopup}>
          <IoMdOptions className="text-[#F65314] text-xl" />
          Filters
          {isPopupVisible && (
            <div className="popup">
              <p> Places within {sliderValue} {selectedOption === "Time" ? "mins" : "km"}</p>
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
                    checked={selectedOption === "Time"}
                    onChange={() => setSelectedOption("Time")}
                  />
                 Time
                </label>
                <label>
                  <input
                    type="radio"
                    name="option"
                    value="Distance"
                    checked={selectedOption === "Distance"}
                    onChange={() => setSelectedOption("Distance")}
                  />
                 Distance
                </label>
              </div>
            </div>
          )}

        </button>
      </div>
      {isLeftPaneOpen && <LeftPane data={apiData} setIsLeftPaneActive={setIsLeftPaneOpen} />}
    </main>
  );
}
