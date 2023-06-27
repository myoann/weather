import React, { useState, useEffect } from 'react'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import axios from 'axios'

import './index.css'

import SearchForm from '../SearchForm'
import WeatherResult from '../WeatherResult'

interface City {
    name: string
    latitude: number
    longitude: number
}

export interface ICurrentWeather {
    dt: number
    sunrise: number
    sunset: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    weather: Array<{
        id: number
        main: string
        description: string
        icon: string
    }>
}

interface WeatherData {
    current: ICurrentWeather
}

const API_KEY = 'd16e5782314dce82f8f8203626ada68d'

const Weather: React.FC = () => {
    const [city, setSelectedCity] = useState<City | null>(null)
    // const [address, setAddress] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>(null)

    /* const handleChange = (address: any) => {
    setAddress(address);
  }; */

    const handleSelect = async (address: string): Promise<void> => {
        const geocode = await geocodeByAddress(address)

        if (geocode.length > 0) {
            const { lat, lng } = await getLatLng(geocode[0])

            setSelectedCity({
                name: address,
                latitude: lat,
                longitude: lng,
            })
        }
    }

    useEffect(() => {
        const fetchWeather = async (): Promise<void> => {
            if (city != null) {
                const { data, ...rest } = await axios.get(
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${city.latitude}&lon=${city.longitude}&appid=${API_KEY}&units=metric`
                )

                console.log(data)
                console.log(rest)
                setWeather(data)
            }
        }

        void fetchWeather()
    }, [city])

    // When the component mounts, get the user's location
    /* useEffect(() => {
    const successCallback = (position: any) => {
      const { latitude, longitude } = position.coords;
      setSelectedCity({
        name: "Your Location",
        latitude,
        longitude,
      });
    };

    const errorCallback = (error: any) => {
      console.error(error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []); */

    return (
        <div className="weather">
            {/*   Would you like to see the weather of  <a onClick={() => handleSelect("Paris")}>Paris</a> ?

      <br />
      OR  */}
            <SearchForm
                onSelect={handleSelect}
                selectedCity={city?.name ?? null}
            />

            {city != null && weather != null && (
                <WeatherResult
                    selectedCity={city.name}
                    currentWeather={weather.current}
                />
            )}
        </div>
    )
}

export default Weather
