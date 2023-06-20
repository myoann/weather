import React, { useEffect, useState } from "react";
// import { customsearch_v1 } from "@googleapis/customsearch";
// Import the css file
import "./index.css";

const API_KEY = "AIzaSyDPNJMIi_sg1u8exgAVFWLv2hs5fUa3QIM";

import testImage from "../../assets/clouds-1.gif";

const CX = "50627cd5f9ec24744";

const customSearchUrl = (query: string) => `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}&searchType=image&imgType=photo`;

interface IWeatherResult {
  cityName: string;
  currentWeather: any;
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

const weatherConditionCodes = [
  {
    id: 200,
    main: "Thunderstorm",
    description: "thunderstorm with light rain",
    icon: "11d",
  },
  {
    id: 201,
    main: "Thunderstorm",
    description: "thunderstorm with rain",
    icon: "11d",
  },
  {
    id: 202,
    main: "Thunderstorm",
    description: "thunderstorm with heavy rain",
    icon: "11d",
  },
  {
    id: 210,
    main: "Thunderstorm",
    description: "light thunderstorm",
    icon: "11d",
  },
  {
    id: 211,
    main: "Thunderstorm",
    description: "thunderstorm",
    icon: "11d",
  },
  {
    id: 212,
    main: "Thunderstorm",
    description: "heavy thunderstorm",
    icon: "11d",
  },
  {
    id: 221,
    main: "Thunderstorm",
    description: "ragged thunderstorm",
    icon: "11d",
  },
  {
    id: 230,
    main: "Thunderstorm",
    description: "thunderstorm with light drizzle",
    icon: "11d",
  },
  {
    id: 231,
    main: "Thunderstorm",
    description: "thunderstorm with drizzle",
    icon: "11d",
  },
  {
    id: 232,
    main: "Thunderstorm",
    description: "thunderstorm with heavy drizzle",
    icon: "11d",
  },
  {
    id: 300,
    main: "Drizzle",
    description: "light intensity drizzle",
    icon: "09d",
  },
  {
    id: 301,
    main: "Drizzle",
    description: "drizzle",
    icon: "09d",
  },
  {
    id: 302,
    main: "Drizzle",
    description: "heavy intensity drizzle",
    icon: "09d",
  },
  {
    id: 310,
    main: "Drizzle",
    description: "light intensity drizzle rain",
    icon: "09d",
  },
  {
    id: 311,
    main: "Drizzle",
    description: "drizzle rain",
    icon: "09d",
  },
  {
    id: 312,
    main: "Drizzle",
    description: "heavy intensity drizzle rain",
    icon: "09d",
  },
  {
    id: 313,
    main: "Drizzle",
    description: "shower rain and drizzle",
    icon: "09d",
  },
  {
    id: 314,
    main: "Drizzle",
    description: "heavy shower rain and drizzle",
    icon: "09d",
  },
  {
    id: 321,
    main: "Drizzle",
    description: "shower drizzle",
    icon: "09d",
  },
  {
    id: 500,
    main: "Rain",
    description: "light rain",
    icon: "10d",
  },
  {
    id: 501,
    main: "Rain",
    description: "moderate rain",
    icon: "10d",
  },
  {
    id: 502,
    main: "Rain",
    description: "heavy intensity rain",
    icon: "10d",
  },
  {
    id: 503,
    main: "Rain",
    description: "very heavy rain",
    icon: "10d",
  },
  {
    id: 504,
    main: "Rain",
    description: "extreme rain",
    icon: "10d",
  },
  {
    id: 511,
    main: "Rain",
    description: "freezing rain",
    icon: "13d",
  },
  {
    id: 520,
    main: "Rain",
    description: "light intensity shower rain",
    icon: "09d",
  },
  {
    id: 521,
    main: "Rain",
    description: "shower rain",
    icon: "09d",
  },
  {
    id: 522,
    main: "Rain",
    description: "heavy intensity shower rain",
    icon: "09d",
  },
  {
    id: 531,
    main: "Rain",
    description: "ragged shower rain",
    icon: "09d",
  },
  { id: 600, main: "Snow", description: "light snow", icon: "13d" },
  { id: 601, main: "Snow", description: "snow", icon: "13d" },
  { id: 602, main: "Snow", description: "heavy snow", icon: "13d" },
  { id: 611, main: "Snow", description: "sleet", icon: "13d" },
  { id: 612, main: "Snow", description: "light shower sleet", icon: "13d" },
  { id: 613, main: "Snow", description: "shower sleet", icon: "13d" },
  { id: 615, main: "Snow", description: "light rain and snow", icon: "13d" },
  { id: 616, main: "Snow", description: "rain and snow", icon: "13d" },
  { id: 620, main: "Snow", description: "light shower snow", icon: "13d" },
  { id: 621, main: "Snow", description: "shower snow", icon: "13d" },
  { id: 622, main: "Snow", description: "heavy shower snow", icon: "13d" },
  { id: 701, main: "Mist", description: "mist", icon: "50d" },
  { id: 711, main: "Smoke", description: "smoke", icon: "50d" },
  { id: 721, main: "Haze", description: "haze", icon: "50d" },
  { id: 731, main: "Dust", description: "sand/dust whirls", icon: "50d" },
  { id: 741, main: "Fog", description: "fog", icon: "50d" },
  { id: 751, main: "Sand", description: "sand", icon: "50d" },
  { id: 761, main: "Dust", description: "dust", icon: "50d" },
  { id: 762, main: "Ash", description: "volcanic ash", icon: "50d" },
  { id: 771, main: "Squall", description: "squalls", icon: "50d" },
  { id: 781, main: "Tornado", description: "tornado", icon: "50d" },
  { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
  { id: 801, main: "Clouds", description: "few clouds: 11-25%", icon: "02d" },
  {
    id: 802,
    main: "Clouds",
    description: "scattered clouds: 25-50%",
    icon: "03d",
  },
  {
    id: 803,
    main: "Clouds",
    description: "broken clouds: 51-84%",
    icon: "04d",
  },
  {
    id: 804,
    main: "Clouds",
    description: "overcast clouds: 85-100%",
    icon: "04d",
    image: "../../assets/images/clouds-1.gif",
  },
];

const WeatherResult = ({ cityName, currentWeather }: IWeatherResult) => {
  // Add a hook to get image results
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const getImage = async () => {
      const query = `"${currentWeather.weather[0].main}" in the city of ${cityName}`;
      const url = customSearchUrl(query);

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      // Return the first image result
      setImage(data.items[0].link);
    };

    getImage();
  }, [cityName]);

  if (!image) {
    return null;
  }

  return (
    <div className="weatherResult" style={{ background: `url(${image})`, backgroundSize: 'cover' }}>
      <h2>{cityName}</h2>
      <p>{currentWeather.weather[0].description}</p>
      <p>Temperature: {currentWeather.temp}°C</p>
      <p>Feels like: {currentWeather.feels_like}°C</p>
      <p>Humidity: {currentWeather.humidity}%</p>
      <img src={testImage} alt="clouds" />
      {testImage}
    </div>
  );
};

export default WeatherResult;
