import type { Subscription } from "@/types/types";

type Period = "monthly" | "yearly" | "daily";

const DAYS_PER_MONTH = 30.44;
const DAYS_PER_YEAR = 365.25;
const MONTHS_PER_YEAR = 12;

const periodMultipliers: Record<string, Record<Period, number>> = {
  "day(s)": {
    daily: 1,
    monthly: DAYS_PER_MONTH,
    yearly: DAYS_PER_YEAR,
  },
  "month(s)": {
    daily: 1 / DAYS_PER_MONTH,
    monthly: 1,
    yearly: MONTHS_PER_YEAR,
  },
  "year(s)": {
    daily: 1 / DAYS_PER_YEAR,
    monthly: 1 / MONTHS_PER_YEAR,
    yearly: 1,
  },
};

/**
 * Calculate subscription cost for any period
 */
export const calculateCost = (
  subscription: Subscription,
  period: Period,
): number => {
  const { price, cycle } = subscription;
  const multiplier = periodMultipliers[cycle.type]?.[period];

  if (!multiplier) return 0;

  return (price / cycle.num) * multiplier;
};

/**
 * Convert amount from one currency to another using exchange rates
 */
export const convertCurrency = (
  amount: number,
  currency: string,
  rates: Record<string, number> | null,
): number => {
  if (!rates) return amount;

  const rate = rates[currency] ?? 1;

  return Number((amount / rate).toFixed(2));
};
