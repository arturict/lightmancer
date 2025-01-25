import { Slider } from "@/components/ui/slider";
import { Sun } from "lucide-react";
import { motion } from "framer-motion";

interface BrightnessSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function BrightnessSlider({ value, onChange }: BrightnessSliderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Brightness</label>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Sun className="text-yellow-500" size={20} />
        </motion.div>
      </div>
      
      <div className="relative">
        <div 
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            background: `linear-gradient(90deg, 
              rgba(255,244,230,0) 0%, 
              rgba(255,244,230,${value/100}) 100%)`
          }}
        />
        <Slider
          value={[value]}
          onValueChange={([newValue]) => onChange(newValue)}
          max={100}
          step={1}
          className="cursor-pointer"
        />
      </div>
      
      <div className="text-right text-sm text-muted-foreground">
        {value}%
      </div>
    </div>
  );
}