import React, { type ReactNode, useEffect, useState } from 'react'
// import { customsearch_v1 } from "@googleapis/customsearch";

import { uvRatings } from '../../uvRatings'
import { weatherConditionCodes } from '../../weatherConditionCodes'
import { type ICurrentWeather } from '../Weather'

import './index.css'

const API_KEY = 'AIzaSyDPNJMIi_sg1u8exgAVFWLv2hs5fUa3QIM'

const CX = '50627cd5f9ec24744'

const customSearchUrl = (query: string): string =>
    `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}&searchType=image&imgType=photo`

interface IWeatherResult {
    selectedCity: string
    currentWeather: ICurrentWeather
}

/* const customSearch = new customsearch_v1.Customsearch({
  auth: API_KEY,
}); */

/*
{
    "dt": 1687175646,
    "sunrise": 1687146395,
    "sunset": 1687204627,
    "temp": 25.19,
    "feels_like": 25.33,
    "pressure": 1012,
    "humidity": 60,
    "dew_point": 16.88, // TEMPÉRATURE de ROSEE en °C - Dew point temperature : C'est la température à partir de laquelle la vapeur d'eau contenue dans l'air humide commence à se condenser au contact d'une surface froide.
    "uvi": 6.96, // The UVI is a measure of the level of UV radiation.
    "clouds": 75,
    "visibility": 10000,
    "wind_speed": 2.57,
    "wind_deg": 0,
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
        }
    ]
}
*/

const WeatherResult = ({
    selectedCity,
    currentWeather,
}: IWeatherResult): ReactNode => {
    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        const getImage = async (): Promise<void> => {
            const query = `"${currentWeather.weather[0].main}" in the city of ${selectedCity}`
            const url = customSearchUrl(query)

            const response = await fetch(url)
            const data = await response.json()
            console.log(data)

            setImage(data.items[0].link)
        }

        void getImage()
    }, [selectedCity])

    if (image === null) {
        return null
    }

    const weatherCondition = weatherConditionCodes.find(
        (item) => item.id === currentWeather.weather[0].id
    )
    const secondImage = weatherCondition?.image

    const sunrise = new Date(currentWeather.sunrise * 1000).toLocaleTimeString()
    const sunriseWithoutSeconds = sunrise.slice(0, sunrise.length - 3)

    const sunset = new Date(currentWeather.sunset * 1000).toLocaleTimeString()
    const sunsetWithoutSeconds = sunset.slice(0, sunset.length - 3)

    const temperature = Math.trunc(currentWeather.temp)
    const feelsLike = Math.trunc(currentWeather.feels_like)

    const uvIndex = currentWeather.uvi
    const uvIndexInt = Math.trunc(uvIndex)
    let uvRatingRisk
    let uvRatingDescription

    if (uvIndexInt >= 1 && uvIndexInt <= 9) {
        uvRatingRisk = uvRatings[uvIndexInt].risk
        uvRatingDescription = uvRatings[uvIndexInt].description
    }

    const thirdImage =
        'https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/rain/raindrops-misted-on-a-windscreen.jpg'
    return (
        <div
            className="weatherResult"
            style={{
                background: `url(${thirdImage})`,
                backgroundSize: 'cover',
            }}
        >
            <div className="weatherBg">
                <div className="temperature">{temperature}°C</div>
                <p>Feels like: {feelsLike}°C</p>
                <h2>{selectedCity}</h2>
                <p>{currentWeather.weather[0].description}</p>
                <p>Humidity: {currentWeather.humidity}%</p>

                <br />
                <h2>UV INDEX</h2>
                <p>UVI: {uvIndex}</p>
                {uvRatingRisk}
                {uvRatingDescription}
                <br />

                <br />
                <h2>SUNRISE & SUNSET</h2>
                <p>Sunrise at: {sunriseWithoutSeconds}</p>
                <p>Sunset at: {sunsetWithoutSeconds}</p>
                <br />

                <br />
                <h2>WIND</h2>
                <p>Wind speed: {currentWeather.wind_speed} km/h</p>
                <p>Wind direction: {currentWeather.wind_deg}°</p>
                <br />

                <br />
                <h2>Feels Like</h2>
                <p>Feels like: {feelsLike}°C</p>
                {/* Comment if the difference regarding the actual temperature is similar or no */}

                <br />

                <img src={secondImage} alt="Flowers" />
                {secondImage !== null && (
                    <picture>
                        <img src={secondImage} alt="Flowers" />
                    </picture>
                )}
            </div>
        </div>
    )
}

export default WeatherResult
