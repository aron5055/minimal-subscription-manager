import type { Subscription } from "@/types/types";

/**
 * Calculate monthly cost based on subscription billing cycle
 */
export const calculateMonthlyCost = (subscription: Subscription): number => {
  const { price, cycle } = subscription;
  const { num, type } = cycle;

  switch (type) {
    case "day(s)":
      return (price / num) * 30.44; // 平均月天数
    case "month(s)":
      return price / num;
    case "year(s)":
      return price / num / 12;
    default:
      return 0;
  }
};

/**
 * Calculate yearly cost based on subscription billing cycle
 */
export const calculateYearlyCost = (subscription: Subscription): number => {
  const { price, cycle } = subscription;
  const { num, type } = cycle;

  switch (type) {
    case "day(s)":
      return (price / num) * 365.25; // 平均年天数
    case "month(s)":
      return (price / num) * 12;
    case "year(s)":
      return price / num;
    default:
      return 0;
  }
};
