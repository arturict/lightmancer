const API_BASE = 'https://lightapi.arturferreira.dev';

export interface LightState {
  power: 'on' | 'off';
  brightness: number;
  rgb: [number, number, number];
}

export interface RoutineStep {
  method: 'set_color' | 'set_power' | 'set_brightness';
  params: {
    red?: number;
    green?: number;
    blue?: number;
    state?: 'on' | 'off';
    brightness?: number;
  };
}

export interface Routine {
  routine_name: string;
  steps: RoutineStep[];
}

export interface Schedule {
  job_id: string;
  routine_name: string;
  date_time?: string;
  interval?: number;
}

function parseColor(colorValue: number): [number, number, number] {
  const r = (colorValue >> 16) & 255;
  const g = (colorValue >> 8) & 255;
  const b = colorValue & 255;
  return [r, g, b];
}

export const api = {
  // Existing methods
  async setPower(state: 'on' | 'off'): Promise<void> {
    const response = await fetch(`${API_BASE}/set_power`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state }),
    });
    if (!response.ok) throw new Error('Failed to set power state');
    console.log('Power state set:', state);
  },

  async setBrightness(brightness: number): Promise<void> {
    const response = await fetch(`${API_BASE}/set_brightness`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brightness }),
    });
    if (!response.ok) throw new Error('Failed to set brightness');
    console.log('Brightness set:', brightness);
  },

  async setColor(red: number, green: number, blue: number): Promise<void> {
    const response = await fetch(`${API_BASE}/set_color`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ red, green, blue }),
    });
    if (!response.ok) throw new Error('Failed to set color');
    console.log('Color set:', { red, green, blue });
  },

  async getState(): Promise<LightState> {
    const response = await fetch(`${API_BASE}/get_state`);
    if (!response.ok) throw new Error('Failed to get light state');
    const data = await response.json();
    console.log('Current state:', data);
    
    const [powerState, brightnessStr, colorValue] = data.response.result;
    const state: LightState = {
      power: powerState as 'on' | 'off',
      brightness: parseInt(brightnessStr, 10),
      rgb: parseColor(parseInt(colorValue, 10))
    };
    
    return state;
  },

  // New methods for routines
  async getRoutines(): Promise<Record<string, RoutineStep[]>> {
    const response = await fetch(`${API_BASE}/routines`);
    if (!response.ok) throw new Error('Failed to get routines');
    const data = await response.json();
    return data.routines;
  },

  async getRoutine(name: string): Promise<RoutineStep[]> {
    const response = await fetch(`${API_BASE}/routines/${name}`);
    if (!response.ok) throw new Error('Failed to get routine');
    const data = await response.json();
    return data.routine;
  },

  async createRoutine(routine: Routine): Promise<void> {
    const response = await fetch(`${API_BASE}/routines`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(routine),
    });
    if (!response.ok) throw new Error('Failed to create routine');
  },

  async deleteRoutine(name: string): Promise<void> {
    const response = await fetch(`${API_BASE}/routines/${name}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete routine');
  },

  async runRoutine(name: string): Promise<void> {
    const response = await fetch(`${API_BASE}/run_routine`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ routine_name: name }),
    });
    if (!response.ok) throw new Error('Failed to run routine');
  },

  // New methods for schedules
  async getSchedules(): Promise<Schedule[]> {
    const response = await fetch(`${API_BASE}/schedules`);
    if (!response.ok) throw new Error('Failed to get schedules');
    const data = await response.json();
    return data.schedules;
  },

  async createSchedule(schedule: Omit<Schedule, 'job_id'>): Promise<string> {
    const response = await fetch(`${API_BASE}/schedules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule),
    });
    if (!response.ok) throw new Error('Failed to create schedule');
    const data = await response.json();
    return data.job_id;
  },

  async deleteSchedule(jobId: string): Promise<void> {
    const response = await fetch(`${API_BASE}/schedules/${jobId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete schedule');
  },
};
