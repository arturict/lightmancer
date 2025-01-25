import { Moon, Sun, Power, Music } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export function MobileNav() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleQuickPowerToggle = async () => {
    try {
      const currentState = await api.getState();
      const newPower = currentState.power === 'on' ? 'off' : 'on';
      await api.setPower(newPower);
      toast({
        title: `Light ${newPower}`,
        description: `Light has been turned ${newPower}`,
      });
    } catch (error) {
      console.error('Failed to toggle power:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to toggle power",
      });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 md:hidden z-50"
    >
      <NavigationMenu className="w-full max-w-full p-4 glass-panel rounded-t-2xl">
        <NavigationMenuList className="w-full justify-around">
          <NavigationMenuItem>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleQuickPowerToggle}
              className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-primary transition-colors"
            >
              <Power className="w-5 h-5" />
              <span className="text-xs font-medium">Power</span>
            </motion.button>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link 
              to="/music"
              className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-primary transition-colors"
            >
              <Music className="w-5 h-5" />
              <span className="text-xs font-medium">Music</span>
            </Link>
          </NavigationMenuItem>

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
        </NavigationMenuList>
      </NavigationMenu>
    </motion.div>
  );
}