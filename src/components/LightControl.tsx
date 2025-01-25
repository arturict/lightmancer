import { useEffect, useState } from "react";
import { api, LightState } from "@/lib/api";
import { StatusCard } from "./StatusCard";
import { BrightnessSlider } from "./BrightnessSlider";
import { ColorPicker } from "./ColorPicker";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export function LightControl() {
  const [state, setState] = useState<LightState>({
    power: 'off',
    brightness: 50,
    rgb: [255, 255, 255],
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchState = async () => {
    try {
      const newState = await api.getState();
      setState(newState);
    } catch (error) {
      console.error('Failed to fetch state:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch light state",
      });
    }
  };

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePowerToggle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newPower = state.power === 'on' ? 'off' : 'on';
      await api.setPower(newPower);
      setState(prev => ({ ...prev, power: newPower }));
      toast({
        title: "Success",
        description: `Light turned ${newPower}`,
      });
    } catch (error) {
      console.error('Failed to toggle power:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to toggle power",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBrightnessChange = async (brightness: number) => {
    if (loading) return;
    setLoading(true);
    try {
      await api.setBrightness(brightness);
      setState(prev => ({ ...prev, brightness }));
      toast({
        title: "Success",
        description: `Brightness set to ${brightness}%`,
      });
    } catch (error) {
      console.error('Failed to set brightness:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to set brightness",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = async (rgb: [number, number, number]) => {
    if (loading) return;
    setLoading(true);
    try {
      const [r, g, b] = rgb;
      await api.setColor(r, g, b);
      setState(prev => ({ ...prev, rgb }));
      toast({
        title: "Success",
        description: "Color updated",
      });
    } catch (error) {
      console.error('Failed to set color:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to set color",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto p-4">
      <StatusCard state={state} />
      
      <Card className="glass-panel p-6">
        <Button
          variant="outline"
          size="lg"
          className={`w-full ${state.power === 'on' ? 'bg-primary text-primary-foreground' : ''}`}
          onClick={handlePowerToggle}
          disabled={loading}
        >
          <Power className="mr-2 h-4 w-4" />
          {state.power === 'on' ? 'Turn Off' : 'Turn On'}
        </Button>
      </Card>

      <Card className="glass-panel p-6">
        <BrightnessSlider
          value={state.brightness}
          onChange={handleBrightnessChange}
        />
      </Card>

      <ColorPicker
        rgb={state.rgb}
        onChange={handleColorChange}
      />
    </div>
  );
}