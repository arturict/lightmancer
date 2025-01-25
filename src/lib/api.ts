const API_BASE = 'https://lightapi.arturferreira.dev';

export interface LightState {
  power: 'on' | 'off';
  brightness: number;
  rgb: [number, number, number];
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
    return data;
  },
};