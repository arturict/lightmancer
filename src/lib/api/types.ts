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