// Prefer configurable API base via Vite env var, fallback to current default
// Cast import.meta to any to avoid type issues if vite types aren't picked up
const VITE_API_BASE = (import.meta as any)?.env?.VITE_API_BASE as
  | string
  | undefined;

export const API_BASE = VITE_API_BASE || 'https://lightapi.arturferreira.dev';

export const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API request failed');
  }
  return response.json();
};