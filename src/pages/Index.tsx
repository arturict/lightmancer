import { LightControl } from "@/components/LightControl";
import { WeatherCard } from "@/components/WeatherCard";
import { MobileNav } from "@/components/MobileNav";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          YeeLight Control
        </h1>
        <WeatherCard />
        <LightControl />
      </motion.div>
      {isMobile && <MobileNav />}
    </div>
  );
}

export default Index;