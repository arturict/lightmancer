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
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const hour = new Date().getHours();
    const newTheme = hour >= 20 || hour < 8 ? "dark" : "light";
    setTheme(newTheme);
    
    const interval = setInterval(() => {
      const currentHour = new Date().getHours();
      const shouldBeTheme = currentHour >= 20 || currentHour < 8 ? "dark" : "light";
      if (shouldBeTheme !== theme) {
        setTheme(shouldBeTheme);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);