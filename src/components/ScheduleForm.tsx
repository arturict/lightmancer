import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ScheduleFormProps {
  routineName: string;
}

export function ScheduleForm({ routineName }: ScheduleFormProps) {
  const [scheduleType, setScheduleType] = useState<"once" | "interval">("once");
  const [dateTime, setDateTime] = useState("");
  const [interval, setInterval] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const schedule = {
        routine_name: routineName,
        ...(scheduleType === "once" ? { date_time: dateTime } : { interval: parseInt(interval) }),
      };
      
      await api.createSchedule(schedule);
      queryClient.invalidateQueries({ queryKey: ['schedules'] });
      toast({
        title: "Success",
        description: "Schedule created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create schedule",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RadioGroup
        defaultValue="once"
        onValueChange={(value) => setScheduleType(value as "once" | "interval")}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="once" id="once" />
          <Label htmlFor="once">Run Once</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="interval" id="interval" />
          <Label htmlFor="interval">Run Repeatedly</Label>
        </div>
      </RadioGroup>

      {scheduleType === "once" ? (
        <div className="space-y-2">
          <Label htmlFor="datetime">Date and Time</Label>
          <Input
            id="datetime"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="interval">Interval (seconds)</Label>
          <Input
            id="interval"
            type="number"
            min="1"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            required
          />
        </div>
      )}

      <Button type="submit" className="w-full">
        Create Schedule
      </Button>
    </form>
  );
}