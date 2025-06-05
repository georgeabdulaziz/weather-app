/**
 * Weather API Route Handler
 * 
 * This API endpoint provides weather information using the OpenWeather API.
 * It supports two methods of querying:
 * 1. By geographic coordinates (latitude/longitude)
 * 2. By city name
 * 
 * @endpoint GET /api/weather
 * 
 * @queryParams
 * - lat: string (optional) - Latitude coordinate
 * - lon: string (optional) - Longitude coordinate
 * - city: string (optional) - City name to search for
 * - units: string (optional) - Units of measurement ('metric' | 'imperial' | 'standard', defaults to 'metric')
 * 
 * @returns {Promise<NextResponse>} JSON response containing:
 * - On Success: Weather data from OpenWeather API
 * - On Error: 
 *   - 400: Missing or invalid parameters
 *   - 404: City not found
 *   - 500: Server error or API key missing
 * 
 * @example
 * // Get weather by coordinates
 * GET /api/weather?lat=51.5074&lon=-0.1278
 * 
 * // Get weather by city
 * GET /api/weather?city=London
 * 
 * // Get weather with specific units
 * GET /api/weather?city=London&units=imperial
 */

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const city = searchParams.get('city');
  const units = searchParams.get('units') || 'metric';

  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key is not configured' },
      { status: 500 }
    );
  }

  try {
    let url;
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    } else {
      return NextResponse.json(
        { error: 'Either city name or coordinates (lat/lon) are required' },
        { status: 400 }
      );
    }

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'City not found' },
          { status: 404 }
        );
      }
      throw new Error(`Weather API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 