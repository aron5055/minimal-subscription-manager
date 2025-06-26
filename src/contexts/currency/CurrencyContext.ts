import { createContext } from "react";

export interface CurrencyContextValue {
  currency: string;
  setCurrency: (c: string) => void;
}

export const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "USD",
  setCurrency: () => {},
});