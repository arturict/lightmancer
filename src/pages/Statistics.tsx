import { UsageStats } from "@/components/UsageStats";
import { MobileNav } from "@/components/MobileNav";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { BarChart, Clock, TrendingUp } from "lucide-react";

const Statistics = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 py-8 px-4 pb-24 md:pb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container max-w-4xl mx-auto space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gradient">
          Usage Statistics
        </h1>

        <Card className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Daily Usage Overview</h2>
          </div>
          <UsageStats />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Today's Usage</h2>
            </div>
            <div className="text-3xl font-bold text-primary">
              {/* This will be populated by UsageStats */}
            </div>
          </Card>

          <Card className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Weekly Trend</h2>
            </div>
            <div className="text-3xl font-bold text-primary">
              {/* This will be populated by UsageStats */}
            </div>
          </Card>
        </div>
      </motion.div>
      {isMobile && <MobileNav />}
    </div>
  );
}

export default Statistics;