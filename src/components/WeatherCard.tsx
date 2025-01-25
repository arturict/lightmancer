import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Cloud, CloudRain, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { getWeatherData, getWeatherPreset } from "@/lib/weather";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export function WeatherCard() {
  const { toast } = useToast();
  
  const { data: weather, isLoading } = useQuery({
    queryKey: ['weather'],
    queryFn: getWeatherData,
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  const getWeatherIcon = () => {
    if (!weather) return <Sun className="text-yellow-500" size={24} />;
    
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="text-yellow-500 animate-spin-slow" size={24} />;
      case 'rainy':
        return <CloudRain className="text-blue-500" size={24} />;
      case 'cloudy':
        return <Cloud className="text-gray-400" size={24} />;
      case 'night':
        return <Moon className="text-blue-900" size={24} />;
    }
  };

  const applyWeatherPreset = async () => {
    if (!weather) return;
    
    try {
      const [r, g, b] = getWeatherPreset(weather.condition);
      await api.setColor(r, g, b);
      await api.setBrightness(weather.condition === 'night' ? 30 : 80);
      
      toast({
        title: "Weather preset applied",
        description: `Applied ${weather.condition} lighting preset`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to apply weather preset",
      });
    }
  };

  return (
    <Card className="glass-panel p-6 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: weather?.condition === 'sunny' 
            ? 'linear-gradient(to right, rgba(254,244,205,0.1), rgba(250,204,21,0.1))'
            : weather?.condition === 'rainy'
            ? 'linear-gradient(to right, rgba(13,165,233,0.1), rgba(56,189,248,0.1))'
            : 'linear-gradient(to right, rgba(226,232,240,0.1), rgba(241,245,249,0.1))'
        }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: weather?.condition === 'sunny' ? 360 : 0
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {getWeatherIcon()}
            </motion.div>
            <div>
              <h3 className="font-medium">Current Weather</h3>
              <p className="text-sm text-muted-foreground">
                {isLoading ? "Loading..." : weather?.condition}
              </p>
            </div>
          </div>
          {weather && (
            <div className="text-2xl font-bold">
              {weather.temperature}°C
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={applyWeatherPreset}
          disabled={isLoading}
        >
          Apply Weather Preset
        </Button>
      </div>
    </Card>
  );
}