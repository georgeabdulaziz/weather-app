'use client';

import { useState, useEffect } from 'react';
import { fetchWeatherData } from '@/services/weatherServices';
import { WeatherResponse } from '@/services/types/weather.types';

export default function LocationRequest() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [city, setCity] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getLocationWeather = () => {
    setLoading(true);
    setError(null);
    setWeather(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        
        try {
          const weatherData = await fetchWeatherData({
            lat: latitude,
            lon: longitude,
            units: 'metric'
          });
          setWeather(weatherData);
        } catch (err) {
          console.log(err);
          setError('Failed to fetch weather data. Please try again later.');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError('Unable to retrieve your location. Please allow location access.');
        setLoading(false);
      }
    );
  };

  const getCityWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const weatherData = await fetchWeatherData({
        city: city.trim(),
        units: 'metric'
      });
      setWeather(weatherData);
    } catch (err) {
      console.log(err);
      setError('City not found or failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return (
      <div className="welcome-card">
        <h2 className="welcome-title">Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="welcome-card">
        <h2 className="welcome-title">
          Welcome to Weather App
        </h2>
        <div className="search-options">
          <div className="location-option">
            <p className="welcome-text">
              Get weather using your current location
            </p>
            <button
              onClick={getLocationWeather}
              className="button"
              disabled={loading}
            >
              Use My Location
            </button>
          </div>

          <div className="city-option">
            <p className="welcome-text">
              Or enter a city name
            </p>
            <form onSubmit={getCityWeather} className="city-form">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="city-input"
                disabled={loading}
              />
              <button
                type="submit"
                className="button"
                disabled={loading}
              >
                Get Weather
              </button>
            </form>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading">
          <p>Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {weather && (
        <div className="weather-card">
          <div className="weather-content">
            <h2 className="location-name">{weather.name}</h2>
            <p className="temperature">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="description">
              {weather.weather[0].description}
            </p>
            <div className="weather-grid">
              <div className="weather-item">
                <p className="weather-item-label">Feels Like</p>
                <p className="weather-item-value">
                  {Math.round(weather.main.feels_like)}°C
                </p>
              </div>
              <div className="weather-item">
                <p className="weather-item-label">Humidity</p>
                <p className="weather-item-value">
                  {weather.main.humidity}%
                </p>
              </div>
              <div className="weather-item">
                <p className="weather-item-label">Wind Speed</p>
                <p className="weather-item-value">
                  {weather.wind.speed} m/s
                </p>
              </div>
              <div className="weather-item">
                <p className="weather-item-label">Pressure</p>
                <p className="weather-item-value">
                  {weather.main.pressure} hPa
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 