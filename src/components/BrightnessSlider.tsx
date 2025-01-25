import { Slider } from "@/components/ui/slider";

interface BrightnessSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function BrightnessSlider({ value, onChange }: BrightnessSliderProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Brightness</label>
      <Slider
        value={[value]}
        onValueChange={([newValue]) => onChange(newValue)}
        max={100}
        step={1}
        className="cursor-pointer"
      />
    </div>
  );
}