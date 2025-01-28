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