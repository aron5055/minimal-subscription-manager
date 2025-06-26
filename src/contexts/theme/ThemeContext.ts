import { createContext } from "react";

export interface ThemeContextValue {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  enableBackgroundColor: boolean;
  setEnableBackgroundColor: (b: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
  enableBackgroundColor: false,
  setEnableBackgroundColor: () => {},
});