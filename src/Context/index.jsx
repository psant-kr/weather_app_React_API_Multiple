import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("");
  const [thisLocation, setLocation] = useState("");
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  // get coordinates

  const fetchCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // getLocation

  function fetchCity() {
    var requestOptions = {
      method: "GET",
    };

    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=e5ffbc5e3c7f4cd4b1797ab1f0a47444`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.features[0].properties);
        console.log(result.features[0].properties.city);
        setName(result.features[0].properties.city);
        setPlace(result.features[0].properties.city);
        console.log(result.features[0].properties.state_district);
      })
      .catch((error) => console.log("error", error));
  }

  // fetch api
  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        aggregateHours: "24",
        location: place,
        contentType: "json",
        unitGroup: "metric",
        shortColumnNames: 0,
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      // console.log(response.data)
      const thisData = Object.values(response.data.locations)[0];
      console.log(thisData);
      setLocation(thisData.address);
      setValues(thisData.values);
      setWeather(thisData.values[0]);
    } catch (e) {
      console.error(e);
      // if the api throws error.
      alert("This place does not exist");
    }
  };


  fetchCoordinates();

  useEffect(() => {
    if(longitude && latitude != null){
      fetchCity();
    };

  }, [latitude, latitude]);

  useEffect(() => {
    if(place != ""){
      fetchWeather()
    };
  }, [place]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
