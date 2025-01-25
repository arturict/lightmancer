import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface ColorPickerProps {
  rgb: [number, number, number];
  onChange: (rgb: [number, number, number]) => void;
}

export function ColorPicker({ rgb, onChange }: ColorPickerProps) {
  const [r, g, b] = rgb;

  const handleChange = (color: 'r' | 'g' | 'b', value: number) => {
    const newRgb: [number, number, number] = [...rgb] as [number, number, number];
    switch (color) {
      case 'r': newRgb[0] = value; break;
      case 'g': newRgb[1] = value; break;
      case 'b': newRgb[2] = value; break;
    }
    onChange(newRgb);
  };

  return (
    <Card className="glass-panel p-6 space-y-4">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Red</label>
          <Slider
            value={[r]}
            onValueChange={([value]) => handleChange('r', value)}
            max={255}
            step={1}
            className="cursor-pointer"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Green</label>
          <Slider
            value={[g]}
            onValueChange={([value]) => handleChange('g', value)}
            max={255}
            step={1}
            className="cursor-pointer"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Blue</label>
          <Slider
            value={[b]}
            onValueChange={([value]) => handleChange('b', value)}
            max={255}
            step={1}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div 
        className="w-full h-12 rounded-lg transition-colors duration-200"
        style={{ backgroundColor: `rgb(${r},${g},${b})` }}
      />
    </Card>
  );
}