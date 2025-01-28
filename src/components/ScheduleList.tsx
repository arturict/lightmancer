import { api, Schedule } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Calendar, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

export function ScheduleList() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: schedules = [] } = useQuery({
    queryKey: ['schedules'],
    queryFn: api.getSchedules,
  });

  const handleDeleteSchedule = async (jobId: string) => {
    try {
      await api.deleteSchedule(jobId);
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      toast({
        title: "Success",
        description: "Schedule deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete schedule",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="glass-panel p-6 space-y-4">
      <h3 className="text-lg font-semibold">Active Schedules</h3>
      <AnimatePresence>
        {schedules.map((schedule) => (
          <motion.div
            key={schedule.job_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-between p-4 rounded-lg bg-background/50 backdrop-blur-sm"
          >
            <div className="space-y-1">
              <div className="font-medium">{schedule.routine_name}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                {schedule.date_time ? (
                  <>
                    <Calendar className="h-4 w-4" />
                    {format(new Date(schedule.date_time), "PPp")}
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Every {schedule.interval} seconds
                  </>
                )}
              </div>
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDeleteSchedule(schedule.job_id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </Card>
  );
}