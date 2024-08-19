import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

import { type ICurrentWeather } from '../Weather'

interface IWeatherChart {
    dataKey: 'humidity' | 'temperature' | 'rain' | 'uvi'
    followingDaysWeather: ICurrentWeather[]
}

interface ICustomTooltip {
    dataKey: string
    active?: boolean
    payload?: Array<{
        value: string
    }>
}

const formatDisplayedValue = (dataKey: string, value: string): string => {
    const formattedValue = Math.trunc(Number(value))

    switch (dataKey) {
        case 'humidity':
            return `${formattedValue}%`
        case 'temperature':
            return `${formattedValue}°C`
        case 'rain':
            return `${formattedValue}mm`
        case 'uvi':
            return `${formattedValue} UVI`
        default:
            return `${formattedValue}`
    }
}

const CustomTooltip = ({
    dataKey,
    active,
    payload,
}: ICustomTooltip): JSX.Element | null => {
    if ((active ?? false) && payload != null && payload.length > 0) {
        return <p>{formatDisplayedValue(dataKey, payload[0].value)}</p>
    }

    return null
}

const WeatherChart = ({
    dataKey,
    followingDaysWeather,
}: IWeatherChart): JSX.Element => {
    const [isPortraitMode, setIsPortraitMode] = useState(
        window.innerHeight > window.innerWidth
    )

    useEffect(() => {
        const handleResize = (): void => {
            setIsPortraitMode(window.innerHeight > window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const data: Array<{ name: string; [key: string]: number | string }> = []
    const currentDate = new Date()
    const tomorrowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)

    followingDaysWeather.forEach(({ humidity, rain, temp, uvi }) => {
        const date = new Date(tomorrowDate)

        const formattedDate = date
            .toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
            })
            .split(' ')
            .reverse()
            .join(' ')

        if (dataKey === 'humidity') {
            data.push({
                name: formattedDate,
                humidity,
            })
        } else if (dataKey === 'temperature') {
            data.push({
                name: formattedDate,
                temperature:
                    typeof temp === 'number'
                        ? Math.trunc(temp)
                        : Math.trunc(temp.day),
            })
        } else if (dataKey === 'rain') {
            if (rain !== undefined) {
                data.push({
                    name: formattedDate,
                    rain,
                })
            } else {
                data.push({
                    name: formattedDate,
                    rain: 0,
                })
            }
        } else if (dataKey === 'uvi') {
            data.push({
                name: formattedDate,
                uvi: Math.trunc(uvi),
            })
        }

        tomorrowDate.setDate(tomorrowDate.getDate() + 1)
    })

    let domain: [number | string, number | string] = ['dataMin', 'dataMax']
    if (dataKey === 'humidity') {
        domain = [0, 100]
    } else if (dataKey === 'temperature') {
        domain = ['dataMin - 5', 'dataMax + 5']
    } else if (dataKey === 'rain') {
        domain = [0, 'dataMax + 1']
    } else if (dataKey === 'uvi') {
        domain = [0, 10]
    }

    return (
        <LineChart
            width={isPortraitMode ? 300 : 600}
            height={isPortraitMode ? 150 : 300}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
            <CartesianGrid
                stroke="grey"
                strokeDasharray="5 5"
                vertical={false}
            />
            <Line type="monotone" dataKey={dataKey} stroke="#fff" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis
                stroke="#fff"
                domain={domain}
                tickFormatter={(tick: string) =>
                    formatDisplayedValue(dataKey, tick)
                }
            />
            <Tooltip content={<CustomTooltip dataKey={dataKey} />} />
        </LineChart>
    )
}

export default WeatherChart
