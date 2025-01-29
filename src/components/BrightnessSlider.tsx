import { Slider } from "@/components/ui/slider";
import { Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface BrightnessSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function BrightnessSlider({ value, onChange }: BrightnessSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;
      const newValue = Math.min(100, Math.max(0, value + (diff / 2)));
      onChange(Math.round(newValue));
      touchStartY = touchY;
    };

    const element = sliderRef.current;
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
    };
  }, [value, onChange]);

  return (
    <div className="space-y-4" ref={sliderRef}>
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