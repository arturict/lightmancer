const API_BASE = 'https://lightapi.arturferreira.dev';

export interface LightState {
  power: 'on' | 'off';
  brightness: number;
  rgb: [number, number, number];
}

function parseColor(colorValue: number): [number, number, number] {
  const r = (colorValue >> 16) & 255;
  const g = (colorValue >> 8) & 255;
  const b = colorValue & 255;
  return [r, g, b];
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
    
    // Parse the response format
    const [powerState, brightnessStr, colorValue] = data.response.result;
    const state: LightState = {
      power: powerState as 'on' | 'off',
      brightness: parseInt(brightnessStr, 10),
      rgb: parseColor(parseInt(colorValue, 10))
    };
    
    return state;
  },
  
  getMusicState: async () => {
    try {
      const response = await fetch('http://localhost:8000/api/music');
      return await response.json();
    } catch (error) {
      console.error('Failed to get music state:', error);
      return { playing: false, volume: 0 };
    }
  },

  setMusicState: async (playing: boolean) => {
    try {
      const response = await fetch('http://localhost:8000/api/music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playing }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to set music state:', error);
      throw error;
    }
  },
};
