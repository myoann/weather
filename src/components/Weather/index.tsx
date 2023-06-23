import React, { useState, useEffect } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import axios from "axios";

import "./index.css";

import SearchForm from "../SearchForm";
import WeatherResult from "../WeatherResult";

interface City {
  name: string;
  country: string;
  state?: string;
  latitude: number;
  longitude: number;
}

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
  };
}

const API_KEY = "d16e5782314dce82f8f8203626ada68d";

const Weather: React.FC = () => {
  const [city, setSelectedCity] = useState<any | null>(null);
 // const [address, setAddress] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

 /* const handleChange = (address: any) => {
    setAddress(address);
  }; */

  const handleSelect = async (address: any) => {
    const geocode = await geocodeByAddress(address);

    if (geocode) {
      const { lat, lng } = await getLatLng(geocode[0]);

      setSelectedCity({
        name: address,
        latitude: lat,
        longitude: lng,
      });
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const { data, ...rest } = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${city.latitude}&lon=${city.longitude}&appid=${API_KEY}&units=metric`
      );

      console.log(data);
      console.log(rest);
      setWeather(data);
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  return (
    <div>
      <SearchForm onSelect={handleSelect} />

      {city && weather && (
        <WeatherResult cityName={city.name} currentWeather={weather.current} />
      )}
    </div>
  );
};

export default Weather;
