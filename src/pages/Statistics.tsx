import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { MobileNav } from "@/components/MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { UsageStats } from "@/components/UsageStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily">Daily Overview</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="space-y-4">
            <Card className="glass-panel p-4 md:p-6">
              <h2 className="text-2xl font-semibold mb-4">Today's Usage</h2>
              <UsageStats view="daily" />
            </Card>
          </TabsContent>
          <TabsContent value="weekly" className="space-y-4">
            <Card className="glass-panel p-4 md:p-6">
              <h2 className="text-2xl font-semibold mb-4">Weekly Overview</h2>
              <UsageStats view="weekly" />
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
      {isMobile && <MobileNav />}
    </div>
  );
};

export default Statistics;