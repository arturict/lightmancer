import { Power } from "lucide-react";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export function PowerButton() {
  const { toast } = useToast();
  const [powerState, setPowerState] = useState<'on' | 'off'>('off');

  const fetchPowerState = async () => {
    try {
      const state = await api.getState();
      setPowerState(state.power);
    } catch (error) {
      console.error('Failed to fetch power state:', error);
    }
  };

  useEffect(() => {
    fetchPowerState();
    const interval = setInterval(fetchPowerState, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickPowerToggle = async () => {
    try {
      const newPower = powerState === 'on' ? 'off' : 'on';
      await api.setPower(newPower);
      setPowerState(newPower);
      toast({
        title: `Light ${newPower}`,
        description: `Light has been turned ${newPower}`,
      });
    } catch (error) {
      console.error('Failed to toggle power:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to toggle power",
      });
    }
  };

  return (
    <NavigationMenuItem>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleQuickPowerToggle}
        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
          powerState === 'on' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
        }`}
      >
        <Power className={`w-5 h-5 ${powerState === 'on' ? 'animate-pulse' : ''}`} />
        <span className="text-xs font-medium">
          {powerState === 'on' ? 'On' : 'Off'}
        </span>
      </motion.button>
    </NavigationMenuItem>
  );
}