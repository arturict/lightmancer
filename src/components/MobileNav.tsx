import { Home, Clock, BarChart } from "lucide-react";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { NavItem } from "./nav/NavItem";
import { PowerButton } from "./nav/PowerButton";
import { ThemeToggle } from "./nav/ThemeToggle";

export function MobileNav() {
  const location = useLocation();

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 md:hidden z-50"
    >
      <NavigationMenu className="w-full max-w-full p-4 glass-panel rounded-t-2xl border-t border-border/50">
        <NavigationMenuList className="w-full justify-around">
          <NavItem
            to="/"
            icon={Home}
            label="Home"
            isActive={location.pathname === '/'}
          />
          <NavItem
            to="/routines"
            icon={Clock}
            label="Routines"
            isActive={location.pathname === '/routines'}
          />
          <NavItem
            to="/statistics"
            icon={BarChart}
            label="Stats"
            isActive={location.pathname === '/statistics'}
          />
          <PowerButton />
          <ThemeToggle />
        </NavigationMenuList>
      </NavigationMenu>
    </motion.div>
  );
}