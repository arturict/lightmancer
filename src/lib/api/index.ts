import { lightApi } from './light';
import { routinesApi } from './routines';
import { schedulesApi } from './schedules';
import { timersApi } from './timers';
import { usageApi } from './usage';

export * from './types';

// Combine all APIs into a single export
export const api = {
  ...lightApi,
  ...routinesApi,
  ...schedulesApi,
  ...timersApi,
  ...usageApi,
};