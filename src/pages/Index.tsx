import { StatusCard } from "@/components/StatusCard";
import { LightControl } from "@/components/LightControl";
import { WeatherCard } from "@/components/WeatherCard";
import { MobileNav } from "@/components/MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const Index = () => {
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
          Light Control
        </h1>
        <StatusCard />
        <LightControl />
        <WeatherCard />
      </motion.div>
      {isMobile && <MobileNav />}
    </div>
  );
};

export default Index;