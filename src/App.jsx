import { useState } from "react";
import Weather from "./weather";

export default function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  console.log(weatherData, "1");

  async function fetchWeather() {
    try {
      // 1) Getting location (geocoding)

      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone } =
        geoData.results.at(0);

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      setWeatherData(weatherData.daily);
    } catch (err) {
      console.err(err);
    }
  }

  return (
    <div className="app">
      <h1>CLASSY WEATHER</h1>
      <div>
        <input
          type="text"
          placeholder="search for location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button className="btn" onClick={fetchWeather}>
        get weather
      </button>
      {weatherData?.weathercode && (
        <Weather weather={weatherData} location={location} />
      )}
    </div>
  );
}
