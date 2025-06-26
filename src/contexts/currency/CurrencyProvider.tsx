import { useLocalStorage } from "@/hooks/useLocalStorage";
import { type ReactNode } from "react";
import { CurrencyContext } from "./CurrencyContext";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useLocalStorage("currency", "USD");

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}