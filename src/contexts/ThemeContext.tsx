import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext, useEffect, type ReactNode } from "react";

const ThemeContext = createContext<{
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  enableBackgroundColor: boolean;
  setEnableBackgroundColor: (b: boolean) => void;
}>({
  theme: "light",
  setTheme: () => {},
  enableBackgroundColor: false,
  setEnableBackgroundColor: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", () => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
    return "light";
  });
  const [enableBackgroundColor, setEnableBackgroundColor] =
    useLocalStorage<boolean>("enableBackgroundColor", false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        enableBackgroundColor,
        setEnableBackgroundColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
