import { today } from "@/lib/date";
import type { ExchangeRateData } from "@/types/types";

interface ExchangeApiResponse {
  conversion_rates: Record<string, number>;
}

const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY as string;
const API_URL = "https://v6.exchangerate-api.com/v6";

const getStorageKey = (currency: string) => `exchange-rate-${currency}`;

const getStoredData = (currency: string): ExchangeRateData | null => {
  try {
    const stored = localStorage.getItem(getStorageKey(currency));
    if (!stored) return null;
    const parsed = JSON.parse(stored) as ExchangeRateData;
    return parsed;
  } catch {
    return null;
  }
};

const storeData = (currency: string, data: ExchangeRateData): void => {
  try {
    localStorage.setItem(getStorageKey(currency), JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to store exchange rate data:", error);
  }
};

const isDataStale = (
  data: ExchangeRateData | null,
  currency: string,
): boolean => {
  return !data || data.date !== today() || data.base !== currency;
};

const fetchFreshRates = async (currency: string): Promise<ExchangeRateData> => {
  const url = `${API_URL}/${API_KEY}/latest/${currency}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Exchange rate API error: ${response.status}`);
  }

  const apiData = (await response.json()) as ExchangeApiResponse;

  const data: ExchangeRateData = {
    date: today(),
    base: currency,
    rates: apiData.conversion_rates,
  };

  storeData(currency, data);
  return data;
};

const getRates = async (currency: string): Promise<ExchangeRateData> => {
  const storedData = getStoredData(currency);

  if (!isDataStale(storedData, currency)) {
    return storedData!;
  }

  return fetchFreshRates(currency);
};

export { getRates };
