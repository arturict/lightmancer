const API_BASE = 'https://lightapi.arturferreira.dev';

// Enhanced type definitions
export interface ApiResponse<T> {
  status: 'success' | 'error';
  response?: T;
  message?: string;
}

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
  delay?: number;
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
  sun_trigger?: 'sunrise' | 'sunset' | null;
}

export interface Timer {
  timer_id: string;
  routine_name: string;
  duration: number;
  created_at: string;
}

export interface DailyUsageResponse {
  status: string;
  daily_usage: Record<string, number>;
}

export interface WeeklyUsageResponse {
  status: string;
  total_seconds_last_7_days: number;
  hours_last_7_days: number;
}

// Utility function to handle API errors
const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API request failed');
  }
  return response.json();
};

export const api = {
  async setColor(red: number = 255, green: number = 255, blue: number = 255): Promise<void> {
    console.log('Setting color:', { red, green, blue });
    const response = await fetch(`${API_BASE}/set_color`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ red, green, blue }),
    });
    const data = await handleApiError(response);
    console.log('Color set response:', data);
  },

  async setPower(state: 'on' | 'off'): Promise<void> {
    console.log('Setting power state:', state);
    const response = await fetch(`${API_BASE}/set_power`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state }),
    });
    const data = await handleApiError(response);
    console.log('Power state set response:', data);
  },

  async setBrightness(brightness: number): Promise<void> {
    if (brightness < 1 || brightness > 100) {
      throw new Error('Brightness must be between 1 and 100');
    }
    console.log('Setting brightness:', brightness);
    const response = await fetch(`${API_BASE}/set_brightness`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brightness }),
    });
    const data = await handleApiError(response);
    console.log('Brightness set response:', data);
  },

  async getState(): Promise<LightState> {
    const response = await fetch(`${API_BASE}/get_state`);
    const data = await handleApiError(response);
    console.log('Current state:', data);
    
    const [powerState, brightnessStr, colorValue] = data.response.result;
    const numericColor = parseInt(colorValue, 10);
    
    return {
      power: powerState as 'on' | 'off',
      brightness: parseInt(brightnessStr, 10),
      rgb: [
        (numericColor >> 16) & 255,
        (numericColor >> 8) & 255,
        numericColor & 255
      ]
    };
  },

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
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create routine');
    }
  },

  async deleteRoutine(name: string): Promise<void> {
    console.log('Deleting routine:', name);
    const response = await fetch(`${API_BASE}/routines/${name}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete routine');
    }
  },

  async runRoutine(name: string): Promise<void> {
    console.log('Running routine:', name);
    const response = await fetch(`${API_BASE}/run_routine`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ routine_name: name }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to run routine');
    }
  },

  async getSchedules(): Promise<Schedule[]> {
    const response = await fetch(`${API_BASE}/schedules`);
    if (!response.ok) throw new Error('Failed to get schedules');
    const data = await response.json();
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
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create schedule');
    }
    const data = await response.json();
    return data.schedule.job_id;
  },

  async deleteSchedule(jobId: string): Promise<void> {
    console.log('Deleting schedule:', jobId);
    const response = await fetch(`${API_BASE}/schedules/${jobId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete schedule');
    }
  },

  async getTimers(): Promise<Timer[]> {
    const response = await fetch(`${API_BASE}/timers`);
    if (!response.ok) throw new Error('Failed to get timers');
    const data = await response.json();
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
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create timer');
    }
    const data = await response.json();
    return data.timer.timer_id;
  },

  async deleteTimer(timerId: string): Promise<void> {
    console.log('Deleting timer:', timerId);
    const response = await fetch(`${API_BASE}/timers/${timerId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete timer');
    }
  },

  async getDailyUsage(): Promise<DailyUsageResponse> {
    const response = await fetch(`${API_BASE}/usage/daily`);
    if (!response.ok) throw new Error('Failed to get daily usage');
    const data = await response.json();
    console.log('Daily usage data:', data);
    return data;
  },

  async getWeeklyUsage(): Promise<WeeklyUsageResponse> {
    const response = await fetch(`${API_BASE}/usage/weekly`);
    if (!response.ok) throw new Error('Failed to get weekly usage');
    const data = await response.json();
    console.log('Weekly usage data:', data);
    return data;
  }
};