import { LightControl } from "@/components/LightControl";
import { WeatherCard } from "@/components/WeatherCard";
import { MobileNav } from "@/components/MobileNav";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { PowerUsage } from "@/components/PowerUsage";
import { QuickActions } from "@/components/QuickActions";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 py-8 px-4 pb-24 md:pb-8">
      <ConnectionStatus />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container max-w-4xl mx-auto space-y-6"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-gradient"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Light Control
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <LightControl />
            <PowerUsage />
          </div>
          <div className="space-y-6">
            <WeatherCard />
          </div>
        </div>
      </motion.div>
      
      <QuickActions />
      {isMobile && <MobileNav />}
    </div>
  );
};

export default Index;