import { WeatherResponse } from './types/weather.types';

interface WeatherParams {
  lat?: number;
  lon?: number;
  city?: string;
  units?: 'metric' | 'imperial' | 'standard';
}

export const fetchWeatherData = async ({
  lat,
  lon,
  city,
  units = 'metric'
}: WeatherParams): Promise<WeatherResponse> => {
  let url = '/api/weather?';

  if (city) {
    url += `city=${encodeURIComponent(city)}&units=${units}`;
  } else if (lat && lon) {
    url += `lat=${lat}&lon=${lon}&units=${units}`;
  } else {
    throw new Error('Either city or coordinates must be provided');
  }

  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch weather data');
  }

  return response.json();
};
