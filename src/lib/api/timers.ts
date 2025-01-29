import { API_BASE, handleApiError } from './utils';
import type { Timer } from './types';

export const timersApi = {
  async getTimers(): Promise<Timer[]> {
    console.log('Fetching timers...');
    const response = await fetch(`${API_BASE}/timers`);
    const data = await handleApiError(response);
    console.log('Fetched timers:', data);
    return data.timers;
  },

  async createTimer(routineName: string, duration: number): Promise<string> {
    console.log('Creating timer:', { routineName, duration });
    const response = await fetch(`${API_BASE}/timers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ routine_name: routineName, duration }),
    });
    const data = await handleApiError(response);
    return data.timer.timer_id;
  },

  async deleteTimer(timerId: string): Promise<void> {
    console.log('Deleting timer:', timerId);
    const response = await fetch(`${API_BASE}/timers/${timerId}`, {
      method: 'DELETE',
    });
    await handleApiError(response);
  },
};