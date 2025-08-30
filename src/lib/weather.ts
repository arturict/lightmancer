// Read from Vite env; provide a demo/fallback key for local dev only
const WEATHER_API_KEY = ((import.meta as any)?.env?.VITE_OPENWEATHER_API_KEY as string | undefined) || 'demo';

export interface WeatherData {
  condition: 'sunny' | 'rainy' | 'cloudy' | 'night';
  temperature: number;
}

export const getWeatherData = async (): Promise<WeatherData> => {
  try {
    // Default to London coordinates - in a real app, you'd get user's location
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=0.1278&appid=${WEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();
    
    console.log('Weather API response:', data);

    // Map OpenWeatherMap conditions to our app's conditions
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;
    
    if (isNight) {
      return { condition: 'night', temperature: Math.round(data.main.temp) };
    }

    const weatherId = data.weather[0].id;
    let condition: WeatherData['condition'] = 'sunny';

    if (weatherId >= 200 && weatherId < 600) {
      condition = 'rainy';
    } else if (weatherId >= 600 && weatherId < 700) {
      condition = 'cloudy';
    } else if (weatherId >= 801) {
      condition = 'cloudy';
    }

    return {
      condition,
      temperature: Math.round(data.main.temp)
    };
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    return { condition: 'sunny', temperature: 20 }; // Fallback
  }
};

export const getWeatherPreset = (condition: WeatherData['condition']): [number, number, number] => {
  switch (condition) {
    case 'sunny':
      return [255, 244, 229]; // Warm yellow
    case 'rainy':
      return [13, 165, 233]; // Ocean blue
    case 'cloudy':
      return [226, 232, 240]; // Soft gray
    case 'night':
      return [30, 58, 138]; // Deep blue
    default:
      return [255, 255, 255];
  }
};