import type { Subscription } from "@/types/types";

/**
 * Check if a subscription has expired
 * Returns true if subscription has an end date and it's in the past
 */
export function isSubscriptionExpired(sub: Subscription): boolean {
  if (!sub.endDate) {
    return false;
  }

  return new Date(sub.endDate) < new Date();
}

function addCycle(date: Date, cycle: { type: string; num: number }): Date {
  const newDate = new Date(date);

  switch (cycle.type) {
    case "day(s)": {
      newDate.setDate(newDate.getDate() + cycle.num);
      break;
    }
    case "month(s)": {
      newDate.setMonth(newDate.getMonth() + cycle.num);
      break;
    }
    case "year(s)": {
      newDate.setFullYear(newDate.getFullYear() + cycle.num);
      break;
    }
  }

  return newDate;
}

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
  if (isSubscriptionExpired(sub)) {
    return null;
  }

  const startDate = new Date(sub.startDate);
  const now = new Date();

  // Calculate the next billing date
  let nextBillingDate = new Date(startDate);

  while (nextBillingDate <= now) {
    nextBillingDate = addCycle(nextBillingDate, sub.cycle);
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

export const today = () => new Date().toLocaleDateString("en-CA");

/**
 * Calculate the next start date for subscription renewal
 * Returns the next billing date based on the subscription's cycle
 */
export function getNextRenewalDate(sub: Subscription): string {
  const startDate = new Date(sub.startDate);
  const now = new Date();

  // Calculate the next billing date
  let nextBillingDate = new Date(startDate);

  while (nextBillingDate <= now) {
    nextBillingDate = addCycle(nextBillingDate, sub.cycle);
  }

  return nextBillingDate.toLocaleDateString("en-CA");
}
