import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Power, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UsageStatsProps {
  view?: 'daily' | 'weekly';
}

export function UsageStats({ view = 'daily' }: UsageStatsProps) {
  const { toast } = useToast();
  const [todayUsage, setTodayUsage] = useState<number>(0);
  const [weeklyUsage, setWeeklyUsage] = useState<{ hours: number }>({ hours: 0 });

  const fetchUsageData = async () => {
    try {
      const dailyData = await api.getDailyUsage();
      const weeklyData = await api.getWeeklyUsage();
      
      // Get the latest daily usage value
      const dailyValues = Object.values(dailyData.daily_usage);
      const latestDailyUsage = dailyValues[dailyValues.length - 1] || 0;
      
      setTodayUsage(latestDailyUsage);
      setWeeklyUsage({ hours: weeklyData.hours_last_7_days });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch usage data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUsageData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center space-x-4">
          <Power className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Today's Usage</p>
            <p className="text-2xl font-bold">{todayUsage.toFixed(1)}h</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center space-x-4">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Last 7 Days Avg</p>
            <p className="text-2xl font-bold">{(weeklyUsage.hours / 7).toFixed(1)}h</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center space-x-4">
          <Power className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Total Usage</p>
            <p className="text-2xl font-bold">{weeklyUsage.hours.toFixed(1)}h</p>
          </div>
        </Card>
      </div>
    </div>
  );
}