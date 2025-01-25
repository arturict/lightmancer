import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ColorPickerProps {
  rgb: [number, number, number];
  onChange: (rgb: [number, number, number]) => void;
}

const PRESETS = [
  { name: "Warm White", rgb: [255, 244, 229] },
  { name: "Cool White", rgb: [255, 255, 255] },
  { name: "Sunset", rgb: [255, 111, 0] },
  { name: "Ocean", rgb: [0, 105, 148] },
  { name: "Forest", rgb: [34, 139, 34] },
  { name: "Purple Rain", rgb: [147, 112, 219] },
];

export function ColorPicker({ rgb, onChange }: ColorPickerProps) {
  const [r, g, b] = rgb;
  const [activePreset, setActivePreset] = useState<number | null>(null);

  const handleChange = (color: 'r' | 'g' | 'b', value: number) => {
    const newRgb: [number, number, number] = [...rgb] as [number, number, number];
    switch (color) {
      case 'r': newRgb[0] = value; break;
      case 'g': newRgb[1] = value; break;
      case 'b': newRgb[2] = value; break;
    }
    onChange(newRgb);
    setActivePreset(null);
  };

  const handlePresetClick = (preset: typeof PRESETS[0], index: number) => {
    onChange(preset.rgb as [number, number, number]);
    setActivePreset(index);
  };

  return (
    <Card className="glass-panel p-6 space-y-6">
      <div className="grid grid-cols-3 gap-2">
        {PRESETS.map((preset, index) => (
          <motion.div
            key={preset.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className={`w-full h-16 relative overflow-hidden ${
                activePreset === index ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handlePresetClick(preset, index)}
            >
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundColor: `rgb(${preset.rgb.join(',')})`
                }}
              />
              <span className="relative text-xs font-medium z-10">
                {preset.name}
              </span>
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium flex items-center justify-between">
            Red
            <span className="text-xs text-muted-foreground">{r}</span>
          </label>
          <Slider
            value={[r]}
            onValueChange={([value]) => handleChange('r', value)}
            max={255}
            step={1}
            className="cursor-pointer"
          />
        </div>
        <div>
          <label className="text-sm font-medium flex items-center justify-between">
            Green
            <span className="text-xs text-muted-foreground">{g}</span>
          </label>
          <Slider
            value={[g]}
            onValueChange={([value]) => handleChange('g', value)}
            max={255}
            step={1}
            className="cursor-pointer"
          />
        </div>
        <div>
          <label className="text-sm font-medium flex items-center justify-between">
            Blue
            <span className="text-xs text-muted-foreground">{b}</span>
          </label>
          <Slider
            value={[b]}
            onValueChange={([value]) => handleChange('b', value)}
            max={255}
            step={1}
            className="cursor-pointer"
          />
        </div>
      </div>

      <motion.div 
        className="w-full h-16 rounded-lg transition-colors duration-200 relative overflow-hidden"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: `rgb(${r},${g},${b})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-white/10" />
      </motion.div>
    </Card>
  );
}