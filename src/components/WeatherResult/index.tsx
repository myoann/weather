import React, { Fragment } from 'react'

import { uvRatings } from '../../uvRatings'
import { weatherConditionCodes } from '../../weatherConditionCodes'

import { Tab, Tabs } from '../Tabs'
import { type ICurrentWeather } from '../Weather'
import WeatherChart from '../WeatherChart'

import './index.css'

interface IWeatherResult {
    currentWeather: ICurrentWeather
    followingDaysWeather: ICurrentWeather[]
    selectedCity: string
}

interface IWeatherGridElement {
    children: JSX.Element
    title: string
}

const WeatherGridElement = ({
    children,
    title,
}: IWeatherGridElement): JSX.Element => (
    <div className="weather-grid-element">
        <h2 className="weather-grid-element-title">{title}</h2>
        <div className="content">{children}</div>
    </div>
)

const WeatherResult = ({
    currentWeather,
    followingDaysWeather,
    selectedCity,
}: IWeatherResult): JSX.Element => {
    const weatherCondition = weatherConditionCodes.find(
        (item) => item.id === currentWeather.weather[0].id
    )
    const secondImage = weatherCondition?.image

    const sunrise = new Date(currentWeather.sunrise * 1000).toLocaleTimeString()
    const sunriseWithoutSeconds = sunrise.slice(0, sunrise.length - 6)

    const sunset = new Date(currentWeather.sunset * 1000).toLocaleTimeString()
    const sunsetWithoutSeconds = sunset.slice(0, sunset.length - 6)

    const temperature =
        typeof currentWeather.temp === 'number'
            ? Math.trunc(currentWeather.temp)
            : Math.trunc(currentWeather.temp.day)

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
            className="weather-result"
            style={{
                backgroundImage:
                    secondImage !== null && secondImage !== undefined
                        ? `url(${secondImage})`
                        : 'none',
                backgroundSize: 'cover',
            }}
        >
            <div className="weather-bg">
                <div className="temperature">{temperature}°C</div>
                <div className="city">{selectedCity}</div>
                <div className="description">
                    {currentWeather.weather[0].description}
                </div>

                <div className="weather-overview">
                    <Tabs title="OVERVIEW">
                        <Tab label="Temperature">
                            <WeatherChart
                                followingDaysWeather={followingDaysWeather}
                                dataKey="temperature"
                            />
                        </Tab>
                        <Tab label="Humidity">
                            <WeatherChart
                                followingDaysWeather={followingDaysWeather}
                                dataKey="humidity"
                            />
                        </Tab>
                        <Tab label="UV Index">
                            <WeatherChart
                                followingDaysWeather={followingDaysWeather}
                                dataKey="uvi"
                            />
                        </Tab>
                        <Tab label="Rainfall">
                            <WeatherChart
                                followingDaysWeather={followingDaysWeather}
                                dataKey="rain"
                            />
                        </Tab>
                    </Tabs>
                </div>

                <div className="weather-grid">
                    <WeatherGridElement title="UV INDEX">
                        <Fragment>
                            <div className="uvi" style={{ color: uvTextColor }}>
                                {uvIndexInt}
                            </div>
                            <div
                                className="uv-rating-risk"
                                style={{ color: uvTextColor }}
                            >
                                {uvRatingRisk}
                            </div>
                            <div className="uv-rating-description">
                                {uvRatingDescription}
                            </div>
                        </Fragment>
                    </WeatherGridElement>

                    <WeatherGridElement title="SUNRISE">
                        <Fragment>
                            <p>Sunrise at {sunriseWithoutSeconds} AM</p>
                            <p>Sunset at {sunsetWithoutSeconds} PM</p>
                        </Fragment>
                    </WeatherGridElement>

                    <WeatherGridElement title="WIND">
                        <Fragment>
                            <p>Wind speed: {currentWeather.wind_speed} km/h</p>
                            <p>Wind direction: {currentWeather.wind_deg}°</p>
                        </Fragment>
                    </WeatherGridElement>

                    <WeatherGridElement title="HUMIDITY">
                        <Fragment>
                            <div className="humidity">
                                {currentWeather.humidity}%
                            </div>
                        </Fragment>
                    </WeatherGridElement>
                </div>
            </div>
        </div>
    )
}

export default WeatherResult
