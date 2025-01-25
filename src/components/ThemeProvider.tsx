import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "light",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const hour = new Date().getHours();
    return hour >= 20 || hour < 8 ? "dark" : "light";
  });

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      const newTheme = hour >= 20 || hour < 8 ? "dark" : "light";
      setTheme(newTheme);
    };

    // Check every minute
    const interval = setInterval(checkTime, 60000);
    
    // Initial check
    checkTime();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);