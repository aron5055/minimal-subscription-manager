import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext, type ReactNode } from "react";

const CurrencyContext = createContext<{
  currency: string;
  setCurrency: (c: string) => void;
}>({
  currency: "USD",
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useLocalStorage("currency", "USD");

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
