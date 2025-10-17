export type PowerState = 'on' | 'off';

export interface LightState {
  power: PowerState;
  brightness: number;
  rgb: [number, number, number];
}

export interface RoutineStep {
  method: string;
  params: Record<string, any>;
  delay?: number;
}

export interface Routine {
  routine_name: string;
  steps: RoutineStep[];
}

export interface RoutinesResponse {
  status: string;
  routines: Record<string, RoutineStep[]>;
}

export interface SingleRoutineResponse {
  status: string;
  routine: RoutineStep[];
}

export interface ApiResponse {
  status: string;
  response: {
    id: number;
    result: [string, string, string];
  };
}

export interface Schedule {
  job_id: string;
  routine_name: string;
  date_time?: string;
  interval?: number;
  sun_trigger?: 'sunrise' | 'sunset';
}

export interface Timer {
  timer_id: string;
  routine_name: string;
  duration: number;
  created_at: string;
}

export interface DailyUsageResponse {
  daily_usage_seconds: Record<string, number>;
}

export interface WeeklyUsageResponse {
  total_seconds_last_7_days: number;
  hours_last_7_days: number;
}