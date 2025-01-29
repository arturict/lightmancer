import { API_BASE, handleApiError } from './utils';
import type { Schedule } from './types';

export const schedulesApi = {
  async getSchedules(): Promise<Schedule[]> {
    console.log('Fetching schedules...');
    const response = await fetch(`${API_BASE}/schedules`);
    const data = await handleApiError(response);
    console.log('Fetched schedules:', data);
    return data.schedules;
  },

  async createSchedule(schedule: {
    routine_name: string;
    date_time?: string;
    interval?: number;
    sun_trigger?: 'sunrise' | 'sunset';
  }): Promise<string> {
    console.log('Creating schedule:', schedule);
    const response = await fetch(`${API_BASE}/schedules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule),
    });
    const data = await handleApiError(response);
    return data.schedule.job_id;
  },

  async deleteSchedule(jobId: string): Promise<void> {
    console.log('Deleting schedule:', jobId);
    const response = await fetch(`${API_BASE}/schedules/${jobId}`, {
      method: 'DELETE',
    });
    await handleApiError(response);
  },
};