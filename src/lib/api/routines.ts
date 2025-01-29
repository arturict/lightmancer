import { API_BASE, handleApiError } from './utils';
import type { Routine, RoutinesResponse, SingleRoutineResponse, RoutineStep } from './types';

export const routinesApi = {
  async getRoutines(): Promise<RoutinesResponse> {
    console.log('Fetching all routines');
    const response = await fetch(`${API_BASE}/routines`);
    const data = await handleApiError(response);
    console.log('Routines fetched:', data);
    return data;
  },

  async getRoutine(name: string): Promise<SingleRoutineResponse> {
    console.log('Fetching routine:', name);
    const response = await fetch(`${API_BASE}/routines/${name}`);
    const data = await handleApiError(response);
    console.log('Routine details:', data);
    return data;
  },

  async createRoutine(routine: Routine): Promise<void> {
    console.log('Creating routine:', routine);
    const response = await fetch(`${API_BASE}/routines`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(routine),
    });
    const data = await handleApiError(response);
    console.log('Routine created:', data);
  },

  async deleteRoutine(name: string): Promise<void> {
    console.log('Deleting routine:', name);
    const response = await fetch(`${API_BASE}/routines/${name}`, {
      method: 'DELETE',
    });
    const data = await handleApiError(response);
    console.log('Routine deleted:', data);
  },

  async runRoutine(name: string): Promise<void> {
    console.log('Running routine:', name);
    const response = await fetch(`${API_BASE}/run_routine`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ routine_name: name }),
    });
    const data = await handleApiError(response);
    console.log('Routine executed:', data);
  },
};