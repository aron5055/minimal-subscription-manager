import { fetchRates } from "@/lib";
import { useEffect, useState } from "react";

export function useExchangeRate(base: string) {
  const [state, setState] = useState<{
    rates: Record<string, number> | null;
    lastUpdated: string | null;
    loading: boolean;
    error: string | null;
  }>({ rates: null, lastUpdated: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    fetchRates(base)
      .then(
        (data) =>
          !cancelled &&
          setState({
            rates: data.rates,
            lastUpdated: data.date,
            loading: false,
            error: null,
          }),
      )
      .catch((err: Error) => {
        if (!cancelled) {
          setState((s) => ({ ...s, loading: false, error: err.message }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [base]);

  return state;
}
