import { Wifi, WifiOff } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(true);
  
  useEffect(() => {
    const checkConnection = async () => {
      try {
        await api.getState();
        if (!isConnected) {
          setIsConnected(true);
          toast.success("Connection restored");
        }
      } catch (error) {
        if (isConnected) {
          setIsConnected(false);
          toast.error("Connection lost");
        }
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-4 right-4 z-50"
    >
      {isConnected ? (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-500"
        >
          <Wifi size={16} />
          <span className="text-xs font-medium">Connected</span>
        </motion.div>
      ) : (
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-500"
        >
          <WifiOff size={16} />
          <span className="text-xs font-medium">Disconnected</span>
        </motion.div>
      )}
    </motion.div>
  );
}