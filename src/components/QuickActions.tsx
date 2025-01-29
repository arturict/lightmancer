import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X, Zap, Moon, Sun } from "lucide-react";

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Sun, label: "Full Brightness", action: () => console.log("Full brightness") },
    { icon: Moon, label: "Night Mode", action: () => console.log("Night mode") },
    { icon: Zap, label: "Power Saving", action: () => console.log("Power saving") },
  ];

  return (
    <motion.div 
      className="fixed bottom-24 right-4 z-50 md:bottom-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 space-y-2"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full glass-panel"
                  onClick={action.action}
                >
                  <action.icon className="mr-2 h-4 w-4" />
                  {action.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className="rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </motion.div>
  );
}