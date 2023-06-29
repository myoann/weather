import React, { type ReactNode } from 'react'
// import { customsearch_v1 } from "@googleapis/customsearch";

import { uvRatings } from '../../uvRatings'
import { weatherConditionCodes } from '../../weatherConditionCodes'
import { type ICurrentWeather } from '../Weather'

import './index.css'

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
    const weatherCondition = weatherConditionCodes.find(
        (item) => item.id === currentWeather.weather[0].id
    )
    const secondImage: string = weatherCondition?.image

    const sunrise = new Date(currentWeather.sunrise * 1000).toLocaleTimeString()
    const sunriseWithoutSeconds = sunrise.slice(0, sunrise.length - 6)

    const sunset = new Date(currentWeather.sunset * 1000).toLocaleTimeString()
    const sunsetWithoutSeconds = sunset.slice(0, sunset.length - 6)

    const temperature = Math.trunc(currentWeather.temp)

    const uvIndex = currentWeather.uvi
    const uvIndexInt = Math.trunc(uvIndex)
    let uvRatingRisk
    let uvRatingDescription
    let uvTextColor = '#FFF'

    if (uvIndexInt >= 0 && uvIndexInt <= 9) {
        uvRatingRisk = uvRatings[uvIndexInt].risk
        uvRatingDescription = uvRatings[uvIndexInt].description
        uvTextColor = uvRatings[uvIndexInt].color
    }

    return (
        <div
            className="weatherResult"
            style={{
                background:
                    secondImage !== null && secondImage !== undefined
                        ? `url(${secondImage})`
                        : 'none',
                backgroundSize: 'cover',
            }}
        >
            <div className="weatherBg">
                <div className="temperature">{temperature}°C</div>
                <div className="city">{selectedCity}</div>
                <div className="description">
                    {currentWeather.weather[0].description}
                </div>

                <div className="weatherGrid">
                    <div className="weatherGridElement">
                        <h2>UV INDEX</h2>
                        <div className="content">
                            <div className="uvi" style={{ color: uvTextColor }}>
                                {uvIndexInt}
                            </div>
                            <div
                                className="uvRatingRisk"
                                style={{ color: uvTextColor }}
                            >
                                {uvRatingRisk}
                            </div>
                            <div className="uvRatingDescription">
                                {uvRatingDescription}
                            </div>
                        </div>
                    </div>

                    <div className="weatherGridElement">
                        <h2>SUNRISE</h2>
                        <div className="content">
                            <p>Sunrise at {sunriseWithoutSeconds} AM</p>
                            <p>Sunset at {sunsetWithoutSeconds} PM</p>
                        </div>
                    </div>

                    <div className="weatherGridElement">
                        <h2>WIND</h2>
                        <div className="content">
                            <p>Wind speed: {currentWeather.wind_speed} km/h</p>
                            <p>Wind direction: {currentWeather.wind_deg}°</p>
                        </div>
                    </div>

                    <div className="weatherGridElement">
                        <h2>HUMIDITY</h2>
                        <div className="content">
                            <div className="humidity">
                                {currentWeather.humidity}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherResult
