import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Clock, Calendar, Battery } from "lucide-react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

interface UsageStatsProps {
  view: "daily" | "weekly";
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function UsageStats({ view }: UsageStatsProps) {
  const { data: dailyUsage = [], isLoading: isDailyLoading } = useQuery({
    queryKey: ['usage', 'daily'],
    queryFn: async () => {
      const data = await api.getDailyUsage();
      console.log('Daily usage data:', data);
      return Object.entries(data.daily_usage).map(([date, seconds]) => ({
        date,
        seconds: seconds as number,
        hours: Math.round((seconds as number) / 3600 * 100) / 100
      }));
    },
  });

  const { data: weeklyUsage, isLoading: isWeeklyLoading } = useQuery({
    queryKey: ['usage', 'weekly'],
    queryFn: async () => {
      const data = await api.getWeeklyUsage();
      console.log('Weekly usage data:', data);
      return {
        seconds: data.total_seconds_last_7_days,
        hours: data.hours_last_7_days
      };
    },
  });

  if (isDailyLoading || isWeeklyLoading) {
    return <div className="animate-pulse h-64 bg-muted rounded-lg" />;
  }

  const formattedDailyUsage = dailyUsage.map(day => ({
    ...day,
    date: format(new Date(day.date), 'MMM d'),
    formattedHours: `${day.hours.toFixed(1)}h`
  }));

  const dailyStats = view === "daily" ? (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center space-x-4">
          <Clock className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Today's Usage</p>
            <p className="text-2xl font-bold">
              {formattedDailyUsage[formattedDailyUsage.length - 1]?.formattedHours || "0h"}
            </p>
          </div>
        </Card>
        <Card className="p-4 flex items-center space-x-4">
          <Battery className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Power Consumption</p>
            <p className="text-2xl font-bold">
              {((formattedDailyUsage[formattedDailyUsage.length - 1]?.hours || 0) * 10).toFixed(1)}W
            </p>
          </div>
        </Card>
        <Card className="p-4 flex items-center space-x-4">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Last 7 Days Avg</p>
            <p className="text-2xl font-bold">{(weeklyUsage?.hours || 0 / 7).toFixed(1)}h</p>
          </div>
        </Card>
      </div>

      <div className="h-[300px]">
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
  ) : null;

  const weeklyStats = view === "weekly" ? (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Total Usage</h3>
          <p className="text-3xl font-bold">{weeklyUsage?.hours.toFixed(1)}h</p>
          <p className="text-sm text-muted-foreground mt-1">Last 7 days</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Power Consumption</h3>
          <p className="text-3xl font-bold">{(weeklyUsage?.hours * 10).toFixed(1)}W</p>
          <p className="text-sm text-muted-foreground mt-1">Total power used</p>
        </Card>
      </div>

      <div className="h-[300px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={formattedDailyUsage}
              dataKey="hours"
              nameKey="date"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) => `${name}: ${value.toFixed(1)}h`}
            >
              {formattedDailyUsage.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  ) : null;

  return (
    <div className="space-y-4">
      {dailyStats}
      {weeklyStats}
    </div>
  );
}