import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext, type FC, type ReactNode } from "react";

const CurrencyContext = createContext<{
  currency: string;
  setCurrency: (c: string) => void;
}>({
  currency: "USD",
  setCurrency: () => {},
});

export const CurrencyProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useLocalStorage("currency", "");

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export function useCurrency() {
  return useContext(CurrencyContext);
}
