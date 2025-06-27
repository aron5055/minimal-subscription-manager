import type { ExchangeRateData } from "@/types/types";

export async function fetchRates(base: string): Promise<ExchangeRateData> {
  const res = await fetch(`/api/?base=${base}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Rate proxy error");
  return res.json() as Promise<ExchangeRateData>;
}
