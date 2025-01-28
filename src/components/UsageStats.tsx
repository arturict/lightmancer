import { api, UsageData } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Clock } from "lucide-react";

export function UsageStats() {
  const { data: dailyUsage = [], isLoading: isDailyLoading } = useQuery({
    queryKey: ['usage', 'daily'],
    queryFn: async () => {
      const data = await api.getDailyUsage();
      console.log('Daily usage data:', data);
      return data || [];
    },
  });

  const { data: weeklyUsage, isLoading: isWeeklyLoading } = useQuery({
    queryKey: ['usage', 'weekly'],
    queryFn: async () => {
      const data = await api.getWeeklyUsage();
      console.log('Weekly usage data:', data);
      return data;
    },
  });

  if (isDailyLoading || isWeeklyLoading) {
    return <div className="animate-pulse h-64 bg-muted rounded-lg" />;
  }

  const formattedDailyUsage = dailyUsage.map(day => ({
    ...day,
    hours: Number((day.seconds / 3600).toFixed(2)),
    date: new Date(day.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }));

  return (
    <div className="space-y-4">
      {weeklyUsage && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Weekly Usage: {Math.round(weeklyUsage.hours)} hours</span>
          </div>
        </div>
      )}

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedDailyUsage}>
            <XAxis 
              dataKey="date" 
              stroke="currentColor" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="currentColor"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '8px'
              }}
            />
            <Bar 
              dataKey="hours" 
              fill="var(--primary)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}