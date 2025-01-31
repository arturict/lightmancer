import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface PowerData {
  time: string;
  usage: number;
}

export function PowerUsage() {
  const { data: usageData, isLoading, error } = useQuery({
    queryKey: ['powerUsage'],
    queryFn: async () => {
      const response = await api.getDailyUsage();
      // Transform the daily_usage object into an array of PowerData
      return Object.entries(response.daily_usage).map(([timestamp, value]) => ({
        time: new Date(timestamp).toLocaleTimeString(),
        usage: value
      }));
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <Card className="p-4 glass-panel animate-pulse">
        <div className="h-[200px] bg-gray-200/20 rounded" />
      </Card>
    );
  }

  if (error) {
    console.error('Failed to fetch power usage:', error);
    return (
      <Card className="p-4 glass-panel">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="text-yellow-500" size={20} />
          <h3 className="font-semibold">Power Usage</h3>
        </div>
        <div className="text-center text-muted-foreground">
          Failed to load power usage data
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 glass-panel">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-yellow-500" size={20} />
        <h3 className="font-semibold">Power Usage</h3>
      </div>
      
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={usageData}>
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