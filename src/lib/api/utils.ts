export const API_BASE = 'https://lightapi.arturferreira.dev';

export const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API request failed');
  }
  return response.json();
};