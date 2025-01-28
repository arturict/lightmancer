import { API_BASE, handleApiError } from './utils';
import type { DailyUsageResponse, WeeklyUsageResponse } from './types';

export const usageApi = {
  async getDailyUsage(): Promise<DailyUsageResponse> {
    const response = await fetch(`${API_BASE}/usage/daily`);
    const data = await handleApiError(response);
    console.log('Daily usage data:', data);
    return data;
  },

  async getWeeklyUsage(): Promise<WeeklyUsageResponse> {
    const response = await fetch(`${API_BASE}/usage/weekly`);
    const data = await handleApiError(response);
    console.log('Weekly usage data:', data);
    return data;
  },
};