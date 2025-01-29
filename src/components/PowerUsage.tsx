import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface PowerData {
  time: string;
  usage: number;
}

export function PowerUsage() {
  const [data, setData] = useState<PowerData[]>([]);
  
  useEffect(() => {
    // Simulate power usage data - replace with actual API call
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev];
        if (newData.length > 10) newData.shift();
        
        newData.push({
          time: new Date().toLocaleTimeString(),
          usage: Math.random() * 100
        });
        
        return newData;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-4 glass-panel">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-yellow-500" size={20} />
        <h3 className="font-semibold">Power Usage</h3>
      </div>
      
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="usage"
              stroke="#F97316"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}