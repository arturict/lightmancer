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

export interface UsageData {
  date: string;
  seconds: number;
  hours: number;
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

export const api = {
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
    return {
      power: powerState as 'on' | 'off',
      brightness: parseInt(brightnessStr, 10),
      rgb: [
        (colorValue >> 16) & 255,
        (colorValue >> 8) & 255,
        colorValue & 255
      ]
    };
  },

  async getRoutines(): Promise<Record<string, RoutineStep[]>> {
    const response = await fetch(`${API_BASE}/routines`);
    if (!response.ok) throw new Error('Failed to get routines');
    const data = await response.json();
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
