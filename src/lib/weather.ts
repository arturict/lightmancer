export interface WeatherData {
  condition: 'sunny' | 'rainy' | 'cloudy' | 'night';
  temperature: number;
}

// Simulated weather API for demo purposes
export const getWeatherData = async (): Promise<WeatherData> => {
  // In a real app, this would fetch from a weather API
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour > 18;
  
  if (isNight) {
    return { condition: 'night', temperature: 18 };
  }
  
  // Simulate different weather conditions
  const conditions: Array<'sunny' | 'rainy' | 'cloudy'> = ['sunny', 'rainy', 'cloudy'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const randomTemp = Math.floor(Math.random() * (30 - 15) + 15);
  
  return {
    condition: randomCondition,
    temperature: randomTemp
  };
};

export const getWeatherPreset = (condition: WeatherData['condition']): [number, number, number] => {
  switch (condition) {
    case 'sunny':
      return [255, 247, 205]; // Warm yellow
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