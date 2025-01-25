import { LightState } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Power, Sun } from "lucide-react";

interface StatusCardProps {
  state: LightState;
}

export function StatusCard({ state }: StatusCardProps) {
  const { power, brightness, rgb } = state;
  const [r, g, b] = rgb;
  
  return (
    <Card className="glass-panel p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Power className={power === 'on' ? 'text-primary animate-glow' : 'text-muted-foreground'} />
          <span className="font-medium">Status: {power === 'on' ? 'On' : 'Off'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sun className="text-yellow-500" />
          <span className="font-medium">{brightness}%</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div 
          className="w-6 h-6 rounded-full" 
          style={{ backgroundColor: `rgb(${r},${g},${b})` }}
        />
        <span className="font-medium">RGB ({r}, {g}, {b})</span>
      </div>
    </Card>
  );
}