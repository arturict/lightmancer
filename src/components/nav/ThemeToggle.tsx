import { Moon, Sun } from "lucide-react";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <NavigationMenuItem>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-primary transition-colors"
      >
        {theme === 'light' ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-blue-400" />
        )}
        <span className="text-xs font-medium">Theme</span>
      </motion.button>
    </NavigationMenuItem>
  );
}