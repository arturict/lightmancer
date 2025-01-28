import { api, UsageData } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Clock } from "lucide-react";

export function UsageStats() {
  const { data: dailyUsage = [] } = useQuery({
    queryKey: ['usage', 'daily'],
    queryFn: api.getDailyUsage,
  });

  const { data: weeklyUsage } = useQuery({
    queryKey: ['usage', 'weekly'],
    queryFn: api.getWeeklyUsage,
  });

  return (
    <Card className="glass-panel p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Usage Statistics</h3>
        {weeklyUsage && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Weekly: {Math.round(weeklyUsage.hours)} hours</span>
          </div>
        )}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dailyUsage}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}