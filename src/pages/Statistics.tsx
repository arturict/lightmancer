import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { MobileNav } from "@/components/MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Statistics = () => {
  const isMobile = useIsMobile();

  const { data: dailyUsage = [] } = useQuery({
    queryKey: ['dailyUsage'],
    queryFn: api.getDailyUsage,
  });

  const { data: weeklyUsage } = useQuery({
    queryKey: ['weeklyUsage'],
    queryFn: api.getWeeklyUsage,
  });

  const chartData = dailyUsage.map(day => ({
    date: new Date(day.date).toLocaleDateString(),
    hours: day.hours
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 py-8 px-4 pb-24 md:pb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container max-w-4xl mx-auto space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Usage Statistics
        </h1>

        <Card className="glass-panel p-4 md:p-6">
          <h2 className="text-2xl font-semibold mb-4">Weekly Usage</h2>
          <div className="text-4xl font-bold mb-2">
            {weeklyUsage?.hours.toFixed(1)}h
          </div>
          <p className="text-muted-foreground">
            Total usage in the last 7 days
          </p>
        </Card>

        <Card className="glass-panel p-4 md:p-6">
          <h2 className="text-2xl font-semibold mb-4">Daily Usage</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  label={{ 
                    value: 'Hours', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Tooltip />
                <Bar dataKey="hours" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>
      {isMobile && <MobileNav />}
    </div>
  );
};

export default Statistics;