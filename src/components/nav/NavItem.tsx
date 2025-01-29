import { LucideIcon } from "lucide-react";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
}

export function NavItem({ to, icon: Icon, label, isActive }: NavItemProps) {
  return (
    <NavigationMenuItem>
      <Link to={to}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
            isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-xs font-medium">{label}</span>
        </motion.button>
      </Link>
    </NavigationMenuItem>
  );
}