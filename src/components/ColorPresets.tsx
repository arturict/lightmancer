import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ColorPreset {
  id: string;
  name: string;
  rgb: [number, number, number];
}

interface ColorPresetsProps {
  currentColor: [number, number, number];
  onSelectPreset: (rgb: [number, number, number]) => void;
}

export function ColorPresets({ currentColor, onSelectPreset }: ColorPresetsProps) {
  const [presets, setPresets] = useState<ColorPreset[]>(() => {
    const saved = localStorage.getItem('colorPresets');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const { toast } = useToast();

  const savePreset = () => {
    const name = `Preset ${presets.length + 1}`;
    const newPreset: ColorPreset = {
      id: Date.now().toString(),
      name,
      rgb: currentColor,
    };
    
    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    localStorage.setItem('colorPresets', JSON.stringify(updatedPresets));
    
    toast({
      title: "Preset saved",
      description: `Color preset "${name}" has been saved`,
    });
  };

  const deletePreset = (id: string) => {
    const updatedPresets = presets.filter(preset => preset.id !== id);
    setPresets(updatedPresets);
    localStorage.setItem('colorPresets', JSON.stringify(updatedPresets));
    
    toast({
      title: "Preset deleted",
      description: "Color preset has been removed",
    });
  };

  const startEditing = (preset: ColorPreset) => {
    setEditingId(preset.id);
    setEditingName(preset.name);
  };

  const saveEdit = (id: string) => {
    const updatedPresets = presets.map(preset => 
      preset.id === id ? { ...preset, name: editingName } : preset
    );
    setPresets(updatedPresets);
    localStorage.setItem('colorPresets', JSON.stringify(updatedPresets));
    setEditingId(null);
    
    toast({
      title: "Preset updated",
      description: "Preset name has been updated",
    });
  };

  return (
    <Card className="glass-panel p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Color Presets</h3>
        <Button
          variant="outline"
          size="icon"
          onClick={savePreset}
          className="rounded-full"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <AnimatePresence>
          {presets.map((preset) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative group"
            >
              <button
                onClick={() => onSelectPreset(preset.rgb)}
                className="w-full p-4 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <div
                  className="w-full h-12 rounded-md mb-2"
                  style={{
                    backgroundColor: `rgb(${preset.rgb.join(',')})`,
                  }}
                />
                {editingId === preset.id ? (
                  <div className="flex gap-2">
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="h-8 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        saveEdit(preset.id);
                      }}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <span className="text-sm font-medium">{preset.name}</span>
                )}
              </button>
              <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="default"
                  size="icon"
                  className="w-6 h-6 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditing(preset);
                  }}
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="w-6 h-6 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePreset(preset.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}