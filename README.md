# Weather App

This is a simple weather app that allows users to search for a city or country and view the current weather conditions. The app uses the OpenWeatherMap API to fetch weather data for the selected location.

## Features

-   Search input with autocomplete: The app has a search input that allows users to search for a city or country. The search input has autocomplete functionality that suggests matching cities and countries as the user types.

-   Weather data display: When a city or country is selected, the app displays the current weather conditions for that location. The weather data includes the temperature, humidity, UV index, time of sunrise, time of sunset, wind speed, and wind direction.

## Getting Started

To get started with the app, clone the repository and run npm install to install the dependencies. Then, run npm start to start the app in development mode.

```
git clone https://github.com/myoann/weather.git
cd weather-app
npm install
npm start
```

The app will be available at http://localhost:8000.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Build the project

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

In order to make it work, please provide the WEATHER_API_KEY as an environment variable such as : `WEATHER_API_KEY=testapi029 npm run start`
You also need to replace YOUR_API_KEY inside the file index.html by your Google Maps API key

You will also see any lint errors in the console.

### `npm lint`

Launches the lint runner to verify all the project.\

## Technologies Used

-   React: A Javascript library for building user interfaces
-   OpenWeatherMap API: An API that provides weather data for locations around the world.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

This app was built using the OpenWeatherMap API.
