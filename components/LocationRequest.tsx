/**
 * LocationRequest Component
 * 
 * A client-side component that handles weather data fetching through two methods:
 * 1. Using browser's geolocation API to get weather for current location
 * 2. Using city name input to get weather for a specific city
 * 
 * Features:
 * - Automatic geolocation detection
 * - City search functionality
 * - Loading states
 * - Error handling
 * - Responsive design
 * 
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <LocationRequest />
 * ```
 * 
 * State Management:
 * - weather: Stores the current weather data
 * - loading: Tracks API request status
 * - error: Stores error messages
 * - location: Stores user's coordinates
 * - city: Manages city input value
 * - isClient: Handles client-side hydration
 */

'use client';

import { useState, useEffect } from 'react';
import { fetchWeatherData } from '@/services/weatherServices';
import { WeatherResponse } from '@/services/types/weather.types';

export default function LocationRequest() {
  /**
   * State declarations with type annotations
   */
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [city, setCity] = useState('');
  const [isClient, setIsClient] = useState(false);

  /**
   * Effect to handle client-side hydration
   * Prevents hydration mismatch by ensuring component renders only on client
   */
  useEffect(() => {
    setIsClient(true);
  }, []);

  /**
   * Fetches weather data using the browser's geolocation API
   * Handles various error cases:
   * - Browser geolocation not supported
   * - User denies location access
   * - API fetch failures
   */
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

  /**
   * Fetches weather data for a specified city
   * @param {React.FormEvent} e - Form submission event
   * Handles:
   * - Empty input validation
   * - API fetch errors
   * - Loading states
   */
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

  // Early return for server-side rendering
  if (!isClient) {
    return (
      <div className="welcome-card">
        <h2 className="welcome-title">Loading...</h2>
      </div>
    );
  }

  /**
   * Component Render Structure:
   * 1. Welcome Card
   *    - Title section
   *    - Location-based weather button
   *    - City search form
   * 
   * 2. Status Indicators
   *    - Loading spinner
   *    - Error messages
   * 
   * 3. Weather Display Card (when data is available)
   *    - City name
   *    - Current temperature
   *    - Weather description
   *    - Additional weather details grid:
   *      * Feels like temperature
   *      * Humidity
   *      * Wind speed
   *      * Pressure
   * 
   * @returns {JSX.Element} The rendered component
   */
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