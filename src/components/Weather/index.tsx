import React, { useState, useEffect } from 'react'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import axios from 'axios'

import SearchForm from '../SearchForm'
import WeatherResult from '../WeatherResult'

import './index.css'

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

interface IWeatherData {
    current: ICurrentWeather
}

const Weather: React.FC = () => {
    const [city, setSelectedCity] = useState<City | null>(null)
    const [weather, setWeather] = useState<IWeatherData | null>(null)

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
            if (city != null && process.env.WEATHER_API_KEY != null) {
                const { data } = await axios.get(
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${city.latitude}&lon=${city.longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`
                )

                setWeather(data)
            }
        }

        void fetchWeather()
    }, [city])

    return (
        <div className="weather">
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
