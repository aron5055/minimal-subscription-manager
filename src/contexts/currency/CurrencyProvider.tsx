import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMemo, type ReactNode } from "react";
import { CurrencyContext } from "./CurrencyContext";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useLocalStorage("currency", "USD");

  const value = useMemo(
    () => ({ currency, setCurrency }),
    [currency, setCurrency],
  );
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}
