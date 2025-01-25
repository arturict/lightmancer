import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Music as MusicIcon, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Music() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: musicState } = useQuery({
    queryKey: ['music'],
    queryFn: api.getMusicState,
    refetchInterval: 1000,
  });

  const mutation = useMutation({
    mutationFn: api.setMusicState,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['music'] });
      toast({
        title: musicState?.playing ? "Music Stopped" : "Music Started",
        description: musicState?.playing ? "The music has been stopped" : "The music has started playing",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to toggle music",
      });
    },
  });

  const handleToggleMusic = () => {
    mutation.mutate(!musicState?.playing);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 py-8 px-4 pb-24 md:pb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container max-w-4xl mx-auto space-y-6"
      >
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Music Sync
          </h1>
        </div>

        <Card className="glass-panel p-6">
          <div className="flex flex-col items-center gap-6">
            <motion.div 
              animate={{ 
                scale: musicState?.playing ? [1, 1.1, 1] : 1,
                rotate: musicState?.playing ? 360 : 0 
              }}
              transition={{ 
                duration: 2,
                repeat: musicState?.playing ? Infinity : 0,
                ease: "linear"
              }}
            >
              <MusicIcon className="w-24 h-24 text-primary" />
            </motion.div>
            
            <Button 
              size="lg"
              onClick={handleToggleMusic}
              className="w-full max-w-xs flex items-center gap-2"
            >
              {musicState?.playing ? (
                <>
                  <Pause className="w-5 h-5" />
                  Stop Music
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Music
                </>
              )}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}