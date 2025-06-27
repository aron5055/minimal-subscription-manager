import { getRates } from "@/service/exchangeService";
import type { ExchangeRateData } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

export function useExchangeRate(currency: string) {
  const [data, setData] = useState<ExchangeRateData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const rates = await getRates(currency);
      setData(rates);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch exchange rates";
      setError(errorMessage);
      console.warn(`Failed to fetch exchange rates for ${currency}:`, err);
    } finally {
      setIsLoading(false);
    }
  }, [currency]);

  useEffect(() => {
    void fetchRates();
  }, [fetchRates]);

  return {
    rates: data?.rates,
    isLoading,
    error,
    lastUpdated: data?.date,
  };
}
