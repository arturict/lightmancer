import { API_BASE, handleApiError } from './utils';
import type { Routine, RoutineStep } from './types';

export const routinesApi = {
  async getRoutines(): Promise<Record<string, RoutineStep[]>> {
    const response = await fetch(`${API_BASE}/routines`);
    const data = await handleApiError(response);
    console.log('Fetched routines:', data);
    return data.routines;
  },

  async createRoutine(routine: Routine): Promise<void> {
    console.log('Creating routine:', routine);
    const response = await fetch(`${API_BASE}/routines`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(routine),
    });
    await handleApiError(response);
  },

  async deleteRoutine(name: string): Promise<void> {
    console.log('Deleting routine:', name);
    const response = await fetch(`${API_BASE}/routines/${name}`, {
      method: 'DELETE',
    });
    await handleApiError(response);
  },

  async runRoutine(name: string): Promise<void> {
    console.log('Running routine:', name);
    const response = await fetch(`${API_BASE}/run_routine`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ routine_name: name }),
    });
    await handleApiError(response);
  },
};