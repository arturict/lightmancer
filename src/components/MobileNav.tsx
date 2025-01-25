import { Home, Search, PieChart, Clock } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: PieChart, label: "Analytics" },
  { icon: Clock, label: "History" },
];

export function MobileNav() {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 md:hidden z-50"
    >
      <NavigationMenu className="w-full max-w-full p-4 glass-panel rounded-t-2xl">
        <NavigationMenuList className="w-full justify-around">
          {navItems.map((Item, index) => (
            <NavigationMenuItem key={index}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-xl",
                  "text-muted-foreground hover:text-primary transition-colors"
                )}
              >
                <Item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{Item.label}</span>
              </motion.button>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </motion.div>
  );
}