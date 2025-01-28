import { useState } from "react";
import { api, Timer } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Timer as TimerIcon, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TimerManager() {
  const [duration, setDuration] = useState("60");
  const [selectedRoutine, setSelectedRoutine] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: routines = {} } = useQuery({
    queryKey: ['routines'],
    queryFn: api.getRoutines,
  });

  const { data: timers = [] } = useQuery({
    queryKey: ['timers'],
    queryFn: api.getTimers,
  });

  const handleCreateTimer = async () => {
    if (!selectedRoutine) {
      toast({
        title: "Error",
        description: "Please select a routine",
        variant: "destructive",
      });
      return;
    }

    try {
      await api.createTimer(selectedRoutine, parseInt(duration));
      queryClient.invalidateQueries({ queryKey: ['timers'] });
      toast({
        title: "Success",
        description: "Timer created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create timer",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTimer = async (timerId: string) => {
    try {
      await api.deleteTimer(timerId);
      queryClient.invalidateQueries({ queryKey: ['timers'] });
      toast({
        title: "Success",
        description: "Timer deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete timer",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="glass-panel p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Select onValueChange={setSelectedRoutine} value={selectedRoutine}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select routine" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(routines).map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Duration (seconds)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-32"
          min="1"
        />
        <Button onClick={handleCreateTimer}>
          <TimerIcon className="mr-2 h-4 w-4" />
          Create Timer
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {timers.map((timer) => (
            <motion.div
              key={timer.timer_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-between p-4 rounded-lg bg-background/50 backdrop-blur-sm"
            >
              <div className="space-y-1">
                <span className="font-medium">{timer.routine_name}</span>
                <div className="text-sm text-muted-foreground">
                  {timer.duration} seconds
                </div>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteTimer(timer.timer_id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}