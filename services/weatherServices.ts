import { WeatherResponse, WeatherParams } from './types/weather.types';

export const fetchWeatherData = async ({
    lat,
    lon,
    units = 'metric'
}: WeatherParams): Promise<WeatherResponse> => {
    const response = await fetch(
        `/api/weather?lat=${lat}&lon=${lon}&units=${units}`
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch weather data');
    }

    return response.json();
}
