import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css"; 

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) { 
      setError("Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const apiKey = "e04c723b4078474ba6a152015250404";
      const encodedCity = encodeURIComponent(city);
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodedCity}&aqi=no`;

      const response = await axios.get(url);
      console.log(response.data);
      setWeather(response.data);
      console.log("Weather State Updated:", response.data);

    } catch (err) {
      console.error("Error fetching data:", err.response ? err.response.data : err);
      setError("City not found. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h2>🌤 Weather App</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="city-input"
        />
        <button onClick={fetchWeather} className="search-btn">
          Search
        </button>
      </div>

      {loading && <p className="loading-message">Fetching weather...</p>}
      {error && <p className="error-message">{error}</p>}

      {weather && (
  <div className="weather-card">
    <h3>{weather.location.name}, {weather.location.country}</h3>
    <p>🌡 Temperature: {weather.current.temp_c}°C</p>
    <p>🌞 Condition: {weather.current.condition.text}</p>
    <p>💨 Wind Speed: {weather.current.wind_kph} km/h</p>
    <p>🌡 Feels Like: {weather.current.feelslike_c}°C</p>
    <img src={`https:${weather.current.condition.icon}`} alt={weather.current.condition.text} />
  </div>
)}
    </div>
  );
};

export default WeatherApp;


