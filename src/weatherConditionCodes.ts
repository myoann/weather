/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error
import ThunderstormImage from './assets/images/thunderstorm.gif'
// @ts-expect-error
import ThunderstormAndRainImage from './assets/images/thunderstorm-and-rain.gif'
// @ts-expect-error
import DrizzleImage from './assets/images/drizzle.gif'
// @ts-expect-error
import HighDrizzleImage from './assets/images/high-drizzle.gif'
// @ts-expect-error
import RainImage from './assets/images/rain.gif'
// @ts-expect-error
import SnowImage from './assets/images/snow.gif'
// @ts-expect-error
import FogImage from './assets/images/fog.gif'
// @ts-expect-error
import TornadoImage from './assets/images/tornado.gif'
// @ts-expect-error
import ClearImage from './assets/images/clear-sky.gif'
// @ts-expect-error
import CloudsImage from './assets/images/clouds.gif'
// @ts-expect-error
import CloudsAndSunImage from './assets/images/clouds-sun.gif'
// @ts-expect-error
import HighCloudsImage from './assets/images/high-clouds.gif'

export const weatherConditionCodes = [
    {
        id: 200,
        main: 'Thunderstorm',
        description: 'thunderstorm with light rain',
        icon: '11d',
        image: ThunderstormAndRainImage,
    },
    {
        id: 201,
        main: 'Thunderstorm',
        description: 'thunderstorm with rain',
        icon: '11d',
        image: ThunderstormAndRainImage,
    },
    {
        id: 202,
        main: 'Thunderstorm',
        description: 'thunderstorm with heavy rain',
        icon: '11d',
        image: ThunderstormAndRainImage,
    },
    {
        id: 210,
        main: 'Thunderstorm',
        description: 'light thunderstorm',
        icon: '11d',
        image: ThunderstormImage,
    },
    {
        id: 211,
        main: 'Thunderstorm',
        description: 'thunderstorm',
        icon: '11d',
        image: ThunderstormImage,
    },
    {
        id: 212,
        main: 'Thunderstorm',
        description: 'heavy thunderstorm',
        icon: '11d',
        image: ThunderstormImage,
    },
    {
        id: 221,
        main: 'Thunderstorm',
        description: 'ragged thunderstorm',
        icon: '11d',
        image: ThunderstormImage,
    },
    {
        id: 230,
        main: 'Thunderstorm',
        description: 'thunderstorm with light drizzle',
        icon: '11d',
        image: ThunderstormImage,
    },
    {
        id: 231,
        main: 'Thunderstorm',
        description: 'thunderstorm with drizzle',
        icon: '11d',
        image: ThunderstormImage,
    },
    {
        id: 232,
        main: 'Thunderstorm',
        description: 'thunderstorm with heavy drizzle',
        icon: '11d',
        image: ThunderstormImage,
    },
    {
        id: 300,
        main: 'Drizzle',
        description: 'light intensity drizzle',
        icon: '09d',
        image: DrizzleImage,
    },
    {
        id: 301,
        main: 'Drizzle',
        description: 'drizzle',
        icon: '09d',
        image: DrizzleImage,
    },
    {
        id: 302,
        main: 'Drizzle',
        description: 'heavy intensity drizzle',
        icon: '09d',
        image: HighDrizzleImage,
    },
    {
        id: 310,
        main: 'Drizzle',
        description: 'light intensity drizzle rain',
        icon: '09d',
        image: DrizzleImage,
    },
    {
        id: 311,
        main: 'Drizzle',
        description: 'drizzle rain',
        icon: '09d',
        image: DrizzleImage,
    },
    {
        id: 312,
        main: 'Drizzle',
        description: 'heavy intensity drizzle rain',
        icon: '09d',
        image: HighDrizzleImage,
    },
    {
        id: 313,
        main: 'Drizzle',
        description: 'shower rain and drizzle',
        icon: '09d',
        image: HighDrizzleImage,
    },
    {
        id: 314,
        main: 'Drizzle',
        description: 'heavy shower rain and drizzle',
        icon: '09d',
        image: HighDrizzleImage,
    },
    {
        id: 321,
        main: 'Drizzle',
        description: 'shower drizzle',
        icon: '09d',
        image: HighDrizzleImage,
    },
    {
        id: 500,
        main: 'Rain',
        description: 'light rain',
        icon: '10d',
        image: RainImage,
    },
    {
        id: 501,
        main: 'Rain',
        description: 'moderate rain',
        icon: '10d',
        image: RainImage,
    },
    {
        id: 502,
        main: 'Rain',
        description: 'heavy intensity rain',
        icon: '10d',
        image: RainImage,
    },
    {
        id: 503,
        main: 'Rain',
        description: 'very heavy rain',
        icon: '10d',
        image: RainImage,
    },
    {
        id: 504,
        main: 'Rain',
        description: 'extreme rain',
        icon: '10d',
        image: RainImage,
    },
    {
        id: 511,
        main: 'Rain',
        description: 'freezing rain',
        icon: '13d',
        image: RainImage,
    },
    {
        id: 520,
        main: 'Rain',
        description: 'light intensity shower rain',
        icon: '09d',
        image: RainImage,
    },
    {
        id: 521,
        main: 'Rain',
        description: 'shower rain',
        icon: '09d',
        image: RainImage,
    },
    {
        id: 522,
        main: 'Rain',
        description: 'heavy intensity shower rain',
        icon: '09d',
        image: RainImage,
    },
    {
        id: 531,
        main: 'Rain',
        description: 'ragged shower rain',
        icon: '09d',
        image: RainImage,
    },
    {
        id: 600,
        main: 'Snow',
        description: 'light snow',
        icon: '13d',
        image: SnowImage,
    },
    {
        id: 601,
        main: 'Snow',
        description: 'snow',
        icon: '13d',
        image: SnowImage,
    },
    {
        id: 602,
        main: 'Snow',
        description: 'heavy snow',
        icon: '13d',
        image: SnowImage,
    },
    {
        id: 611,
        main: 'Snow',
        description: 'sleet',
        icon: '13d',
        image: SnowImage,
    },
    {
        id: 612,
        main: 'Snow',
        description: 'light shower sleet',
        icon: '13d',
        image: SnowImage,
    },
    {
        id: 613,
        main: 'Snow',
        description: 'shower sleet',
        icon: '13d',
        image: SnowImage,
    },
    {
        id: 615,
        main: 'Snow',
        description: 'light rain and snow',
        icon: '13d',
        image: SnowImage,
    },
    {
        id: 616,
        main: 'Snow',
        description: 'rain and snow',
        icon: '13d',
        image: SnowImage,
    },
    {
        id: 620,
        main: 'Snow',
        description: 'light shower snow',
        icon: '13d',
        image: SnowImage,
    },
    {
        id: 621,
        main: 'Snow',
        description: 'shower snow',
        icon: '13d',
        image: SnowImage,
    },
    {
        id: 622,
        main: 'Snow',
        description: 'heavy shower snow',
        icon: '13d',
        image: SnowImage,
    },
    {
        id: 701,
        main: 'Mist',
        description: 'mist',
        icon: '50d',
        image: FogImage,
    },
    {
        id: 711,
        main: 'Smoke',
        description: 'smoke',
        icon: '50d',
        image: CloudsImage,
    },
    {
        id: 721,
        main: 'Haze',
        description: 'haze',
        icon: '50d',
        image: CloudsImage,
    },
    {
        id: 731,
        main: 'Dust',
        description: 'sand/dust whirls',
        icon: '50d',
        image: CloudsImage,
    },
    {
        id: 741,
        main: 'Fog',
        description: 'fog',
        icon: '50d',
        image: FogImage,
    },
    {
        id: 751,
        main: 'Sand',
        description: 'sand',
        icon: '50d',
        image: CloudsImage,
    },
    {
        id: 761,
        main: 'Dust',
        description: 'dust',
        icon: '50d',
        image: CloudsImage,
    },
    {
        id: 762,
        main: 'Ash',
        description: 'volcanic ash',
        icon: '50d',
        image: CloudsImage,
    },
    {
        id: 771,
        main: 'Squall',
        description: 'squalls',
        icon: '50d',
        image: CloudsImage,
    },
    {
        id: 781,
        main: 'Tornado',
        description: 'tornado',
        icon: '50d',
        image: TornadoImage,
    },
    {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
        image: ClearImage,
    },
    {
        id: 801,
        main: 'Clouds',
        description: 'few clouds: 11-25%',
        icon: '02d',
        image: CloudsAndSunImage,
    },
    {
        id: 802,
        main: 'Clouds',
        description: 'scattered clouds: 25-50%',
        icon: '03d',
        image: CloudsImage,
    },
    {
        id: 803,
        main: 'Clouds',
        description: 'broken clouds: 51-84%',
        image: HighCloudsImage,
    },
    {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds: 85-100%',
        image: HighCloudsImage,
    },
]
