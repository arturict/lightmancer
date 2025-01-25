import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HexColorPicker } from "react-colorful";

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
  const [activePreset, setActivePreset] = useState<number | null>(null);

  // Convert RGB to hex for the color picker
  const rgbToHex = (r: number, g: number, b: number) => 
    "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");

  // Convert hex to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16)
        ] as [number, number, number]
      : [0, 0, 0];
  };

  const handleColorChange = (hex: string) => {
    const newRgb = hexToRgb(hex);
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

      <div className="w-full aspect-square max-w-md mx-auto relative rounded-xl overflow-hidden">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <HexColorPicker
            color={rgbToHex(rgb[0], rgb[1], rgb[2])}
            onChange={handleColorChange}
            className="w-full h-full !rounded-xl"
          />
        </motion.div>
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
          style={{ backgroundColor: `rgb(${rgb.join(',')})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-white/10" />
      </motion.div>
    </Card>
  );
}