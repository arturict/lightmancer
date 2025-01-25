import { LightState } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Power, Sun, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface StatusCardProps {
  state: LightState;
}

export function StatusCard({ state }: StatusCardProps) {
  const { power, brightness, rgb } = state;
  const [r, g, b] = rgb;
  
  return (
    <Card className="glass-panel p-6 relative overflow-hidden backdrop-blur-xl bg-black/10">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
        animate={{
          opacity: power === 'on' ? 0.5 : 0.1
        }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                scale: power === 'on' ? [1, 1.2, 1] : 1,
                opacity: power === 'on' ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            >
              <Power className={power === 'on' ? 'text-primary animate-glow' : 'text-muted-foreground'} size={24} />
            </motion.div>
            <span className="font-medium text-lg">
              {power === 'on' ? 'Active' : 'Standby'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Sun className="text-yellow-500" size={24} />
            <motion.div
              className="font-medium text-lg"
              animate={{ opacity: [0.5, 1] }}
              transition={{ duration: 0.5, repeat: power === 'on' ? Infinity : 0, repeatType: "reverse" }}
            >
              {brightness}%
            </motion.div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-8 h-8 rounded-full shadow-lg"
            style={{ backgroundColor: `rgb(${r},${g},${b})` }}
            animate={{
              scale: power === 'on' ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          />
          <span className="font-medium">RGB ({r}, {g}, {b})</span>
          <Zap className="ml-auto text-yellow-400" size={20} />
        </div>
      </div>
    </Card>
  );
}