import { API_BASE, handleApiError } from './utils';
import type { DailyUsageResponse, WeeklyUsageResponse } from './types';

export const usageApi = {
  async getDailyUsage(): Promise<DailyUsageResponse> {
    console.log('Fetching daily usage...');
    const response = await fetch(`${API_BASE}/usage/daily`);
    const data = await handleApiError(response);
    console.log('Daily usage data:', data);
    return data;
  },

  async getWeeklyUsage(): Promise<WeeklyUsageResponse> {
    console.log('Fetching weekly usage...');
    const response = await fetch(`${API_BASE}/usage/weekly`);
    const data = await handleApiError(response);
    console.log('Weekly usage data:', data);
    return data;
  },
};