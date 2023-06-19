import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import axios from "axios";

import WeatherResult from "./WeatherResult";

interface City {
  name: string;
  country: string;
  state?: string;
  latitude: number;
  longitude: number;
}

interface WeatherData {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
  };
}

const API_KEY = "d16e5782314dce82f8f8203626ada68d";

const Weather: React.FC = () => {
  const [city, setSelectedCity] = useState<any | null>(null);
  const [address, setAddress] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const handleChange = (address: any) => {
    setAddress(address);
  };

  const handleSelect = async (address: any) => {
    const geocode = await geocodeByAddress(address);

    if (geocode) {
      const { lat, lng } = await getLatLng(geocode[0]);

      setSelectedCity({
        name: address,
        latitude: lat,
        longitude: lng,
      });
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const { data, ...rest } = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${city.latitude}&lon=${city.longitude}&appid=${API_KEY}&units=metric`
      );

      console.log(data);
      console.log(rest);
      setWeather(data);
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })} 
                    key={suggestion.id}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      {city && weather && (
        <WeatherResult cityName={city.name} currentWeather={weather.current} />
      )}
    </div>
  );
};

export default Weather;
