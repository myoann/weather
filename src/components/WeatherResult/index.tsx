import React, { useEffect, useState } from "react";
// import { customsearch_v1 } from "@googleapis/customsearch";

import { weatherConditionCodes } from "../../weatherConditionCodes";

import "./index.css";

const API_KEY = "AIzaSyDPNJMIi_sg1u8exgAVFWLv2hs5fUa3QIM";

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

const WeatherResult = ({ cityName, currentWeather }: IWeatherResult) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const getImage = async () => {
      const query = `"${currentWeather.weather[0].main}" in the city of ${cityName}`;
      const url = customSearchUrl(query);

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      setImage(data.items[0].link);
    };

    getImage();
  }, [cityName]);

  if (!image) {
    return null;
  }

  const weatherCondition = weatherConditionCodes.find((item) => item.id === currentWeather.weather[0].id);
  let secondImage;
  if (weatherCondition?.image) {
    secondImage = weatherCondition.image;
  }
  
  return (
    <div className="weatherResult" style={{ background: `url(${image})`, backgroundSize: 'cover' }}>
      <h2>{cityName}</h2>
      <p>{currentWeather.weather[0].description}</p>
      <p>Temperature: {currentWeather.temp}°C</p>
      <p>Feels like: {currentWeather.feels_like}°C</p>
      <p>Humidity: {currentWeather.humidity}%</p>
      {secondImage &&
        <picture>
          <img src={secondImage} alt="Flowers"  />
        </picture>
      }
    </div>
  );
};

export default WeatherResult;
