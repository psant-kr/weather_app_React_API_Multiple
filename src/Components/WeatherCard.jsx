/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDate } from "../Utils/useDate";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";
import "../index.css";

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
}) => {
  const [icon, setIcon] = useState(sun);
  const { time } = useDate();

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes("cloud")) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes("rain")) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes("clear")) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes("thunder")) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes("fog")) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes("snow")) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes("wind")) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  if (
    temperature ||
    windspeed ||
    humidity ||
    place ||
    heatIndex ||
    iconString ||
    conditions
  ) {
    return (
      <div className="w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4 text-black">
        <div className="flex w-full just-center, items-center gap-4 mt-12 mb-4">
          <img src={icon} alt="weather_icon" />
          <p className="font-bold text-5xl flex justify-center items-center">
            {temperature} &deg;C
          </p>
        </div>
        <div className="font-bold text-center text-xl">{place}</div>
        <div className="w-full flex justify-between items-center mt-4">
          <p className="flex-1 text-center p-2">{new Date().toDateString()}</p>
          <p className="flex-1 text-center p-2">{time}</p>
        </div>
        <div className="w-full flex justify-between items-center mt-4 gap-4">
          <p className="flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg">
            Wind Speed <p className="font-normal">{windspeed} km/h</p>
          </p>
          <p className="flex-1 text-center p-2 font-bold rounded-lg bg-green-600">
            Humidity <p className="font-normal">{humidity} gm/m&#179;</p>
          </p>
        </div>
        <div className="w-full p-3 mt-4 flex justify-between items-center">
          <p className="font-semibold text-lg">Heat Index</p>
          <p className="text-lg">{heatIndex ? heatIndex : "N/A"}</p>
        </div>
        <hr className="bg-slate-600" />
        <div className="w-full p-4 flex justify-center items-center text-3xl font-semibold">
          {conditions}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
        <div className="text-center p-4 bg-white shadow rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800">Loading...</h1>
          {/* <h1 className="text-4xl font-bold text-gray-800">404</h1> */}
          {/* <p className="text-lg text-gray-600 mt-2">Page Not Found</p>
          <p className="text-sm text-gray-500 mt-2">
            The page you're looking for does not exist or has been moved.
          </p>
          <a
            href="/"
            className="mt-4 inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Go to Home
          </a> */}
        </div>
      </div>
    );
  }
};

export default WeatherCard;
