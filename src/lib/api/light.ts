import { API_BASE, handleApiError } from './utils';
import type { LightState } from './types';

export const lightApi = {
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
};