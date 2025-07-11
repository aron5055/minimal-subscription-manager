import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useMemo, type ReactNode } from "react";
import { ThemeContext } from "./ThemeContext";

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

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      enableBackgroundColor,
      setEnableBackgroundColor,
    }),
    [theme, setTheme, enableBackgroundColor, setEnableBackgroundColor],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
