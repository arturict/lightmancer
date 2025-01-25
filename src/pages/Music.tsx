import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Music as MusicIcon } from "lucide-react";

export default function Music() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 py-8 px-4 pb-24 md:pb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container max-w-4xl mx-auto space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Music Sync
        </h1>

        <Card className="glass-panel p-6 text-center">
          <MusicIcon className="w-12 h-12 mx-auto mb-4 text-primary" />
          <p className="text-lg text-muted-foreground">
            Music sync feature coming soon! Stay tuned for updates.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}