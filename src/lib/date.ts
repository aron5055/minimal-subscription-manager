import type { Subscription } from "@/types/types";

/**
 * Calculate the number of days left until the next billing cycle
 * Returns null if subscription is paused or has ended
 */
export function daysLeft(sub: Subscription): number | null {
  // If subscription is paused, return null
  if (sub.status === "paused") {
    return null;
  }

  // If subscription has ended, return null
  if (sub.endDate && new Date(sub.endDate) < new Date()) {
    return null;
  }

  const startDate = new Date(sub.startDate);
  const now = new Date();

  // Calculate the next billing date
  let nextBillingDate = new Date(startDate);

  while (nextBillingDate <= now) {
    switch (sub.cycle.type) {
      case "day(s)":
        nextBillingDate.setDate(nextBillingDate.getDate() + sub.cycle.num);
        break;
      case "month(s)":
        nextBillingDate.setMonth(nextBillingDate.getMonth() + sub.cycle.num);
        break;
      case "year(s)":
        nextBillingDate.setFullYear(
          nextBillingDate.getFullYear() + sub.cycle.num,
        );
        break;
    }
  }

  // If there's an end date and next billing would be after it, return null
  if (sub.endDate && nextBillingDate > new Date(sub.endDate)) {
    return null;
  }

  // Calculate days difference
  const timeDiff = nextBillingDate.getTime() - now.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
}
