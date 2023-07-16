import React, { useState, useEffect } from 'react'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

import SearchForm from '../SearchForm'
import WeatherResult from '../WeatherResult'

import './index.css'

interface ICity {
    latitude: number
    longitude: number
    name: string
}

export interface ICurrentWeather {
    clouds: number
    dew_point: number
    dt: number
    feels_like: number
    humidity: number
    pressure: number
    sunrise: number
    sunset: number
    temp: number | { day: number; min: number; max: number }
    uvi: number
    visibility: number
    weather: Array<{
        id: number
        main: string
        description: string
        icon: string
    }>
    wind_deg: number
    wind_speed: number
    rain?: number
}

interface IWeatherData {
    current: ICurrentWeather
    daily: ICurrentWeather[]
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const Weather: React.FC = () => {
    const [city, setSelectedCity] = useState<ICity | null>(null)
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

    // On page load, call the API to get the weather for the selected city if there is one in the URL
    const [searchParams] = useSearchParams()
    const cityName = searchParams.get('city')

    useEffect(() => {
        const fetchCity = async (): Promise<void> => {
            if (cityName != null) {
                const geocode = await geocodeByAddress(cityName)

                if (geocode.length > 0) {
                    const { lat, lng } = await getLatLng(geocode[0])

                    setSelectedCity({
                        name: cityName,
                        latitude: lat,
                        longitude: lng,
                    })
                }
            }
        }

        void fetchCity()
    }, [cityName])

    useEffect(() => {
        const fetchWeather = async (): Promise<void> => {
            if (city != null && API_KEY != null) {
                const { data } = await axios.get(
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${city.latitude}&lon=${city.longitude}&appid=${API_KEY}&units=metric`
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
                    followingDaysWeather={weather.daily}
                />
            )}
        </div>
    )
}

export default Weather
