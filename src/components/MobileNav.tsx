import { Moon, Sun, Power, Home, Clock } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";

export function MobileNav() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const location = useLocation();

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
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
                  location.pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="text-xs font-medium">Home</span>
              </motion.button>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/routines">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
                  location.pathname === '/routines' ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Clock className="w-5 h-5" />
                <span className="text-xs font-medium">Routines</span>
              </motion.button>
            </Link>
          </NavigationMenuItem>

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