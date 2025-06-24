import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext, type FC, type ReactNode } from "react";

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

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
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
};

export function useTheme() {
  return useContext(ThemeContext);
}
