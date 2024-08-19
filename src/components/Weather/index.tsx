import React, { useState, useEffect, Fragment } from 'react'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

import SearchForm from '../SearchForm'
import WeatherResult from '../WeatherResult'

import './index.css'

const OPEN_WEATHER_MAP_API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY

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

const Weather: React.FC = () => {
    const [city, setSelectedCity] = useState<ICity | null>(null)
    const [weather, setWeather] = useState<IWeatherData | null>(null)
    const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false)

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
            if (city != null && OPEN_WEATHER_MAP_API_KEY != null) {
                const { data } = await axios.get(
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${city.latitude}&lon=${city.longitude}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`
                )

                setWeather(data)
            }
        }

        void fetchWeather()
    }, [city])

    useEffect(() => {
        const checkGoogleMapsLoaded = () => {
            if (window.google && window.google.maps) {
                setIsGoogleMapsLoaded(true)
            } else {
                setTimeout(checkGoogleMapsLoaded, 100)
            }
        }

        checkGoogleMapsLoaded()
    }, [])

    return (
        <div className="weather">
            {!isGoogleMapsLoaded ? (
                <div className="loader" />
            ) : (
                <Fragment>
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
                </Fragment>
            )}
        </div>
    )
}

export default Weather
