import { useState } from "react";
import { api, RoutineStep, Routine } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash, Play, Clock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ScheduleForm } from "@/components/ScheduleForm";

export function RoutineManager() {
  const [newRoutineName, setNewRoutineName] = useState("");
  const [selectedRoutine, setSelectedRoutine] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: routines = {}, isLoading } = useQuery({
    queryKey: ['routines'],
    queryFn: api.getRoutines,
  });

  const handleCreateRoutine = async () => {
    if (!newRoutineName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a routine name",
        variant: "destructive",
      });
      return;
    }

    try {
      const newRoutine: Routine = {
        routine_name: newRoutineName,
        steps: []
      };
      
      await api.createRoutine(newRoutine);
      queryClient.invalidateQueries({ queryKey: ['routines'] });
      setNewRoutineName("");
      toast({
        title: "Success",
        description: "Routine created successfully",
      });
    } catch (error) {
      console.error("Failed to create routine:", error);
      toast({
        title: "Error",
        description: "Failed to create routine",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRoutine = async (name: string) => {
    try {
      await api.deleteRoutine(name);
      queryClient.invalidateQueries({ queryKey: ['routines'] });
      toast({
        title: "Success",
        description: "Routine deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete routine",
        variant: "destructive",
      });
    }
  };

  const handleRunRoutine = async (name: string) => {
    try {
      await api.runRoutine(name);
      toast({
        title: "Success",
        description: "Routine executed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to run routine",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="glass-panel p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4">
        <Input
          placeholder="New routine name"
          value={newRoutineName}
          onChange={(e) => setNewRoutineName(e.target.value)}
          className="flex-1"
        />
        <Button 
          onClick={handleCreateRoutine}
          className="w-full md:w-auto whitespace-nowrap"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Routine
        </Button>
      </div>

      <div className="space-y-2 md:space-y-4">
        <AnimatePresence>
          {Object.entries(routines).map(([name, steps]) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col md:flex-row items-stretch md:items-center justify-between p-4 rounded-lg bg-background/50 backdrop-blur-sm gap-2 md:gap-4"
            >
              <div className="flex-1 font-medium text-left">{name}</div>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRunRoutine(name)}
                  className="h-8 w-8"
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Schedule Routine</DialogTitle>
                    </DialogHeader>
                    <ScheduleForm routineName={name} />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteRoutine(name)}
                  className="h-8 w-8"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}