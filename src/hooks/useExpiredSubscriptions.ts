import { useSubscription } from "@/contexts/subscription";
import { getNextRenewalDate, isSubscriptionExpired } from "@/lib/date";
import type { Subscription } from "@/types/types";
import { useCallback, useEffect } from "react";

/**
 * Hook to automatically handle expired subscriptions
 * Checks for expired subscriptions on mount and sets up periodic checks
 * - For auto-renewing subscriptions: updates start date to next billing cycle
 * - For non-auto-renewing subscriptions: pauses them
 */
export function useExpiredSubscriptions() {
  const { state, dispatch } = useSubscription();

  const checkAndHandleExpiredSubscriptions = useCallback(() => {
    // Find all active subscriptions that have expired
    const expiredSubs = state.subs.filter((sub: Subscription) => {
      return sub.status === "active" && isSubscriptionExpired(sub);
    });

    // Handle each expired subscription
    expiredSubs.forEach((sub) => {
      if (sub.autoRenew) {
        // For auto-renewing subscriptions, update the start date to the next billing cycle
        const nextStartDate = getNextRenewalDate(sub);
        dispatch({
          type: "UPDATE_SUB",
          payload: {
            ...sub,
            startDate: nextStartDate,
          },
        });
      } else {
        dispatch({
          type: "UPDATE_SUB",
          payload: {
            ...sub,
            status: "paused",
          },
        });
      }
    });

    return expiredSubs.length;
  }, [state.subs, dispatch]);

  useEffect(() => {
    // Check immediately when the hook is mounted
    const handledCount = checkAndHandleExpiredSubscriptions();

    if (handledCount > 0) {
      console.log(
        `Automatically handled ${handledCount} expired subscription(s)`,
      );
    }

    // Set up periodic checks (every hour)
    const interval = setInterval(
      () => {
        const handledCount = checkAndHandleExpiredSubscriptions();
        if (handledCount > 0) {
          console.log(
            `Automatically handled ${handledCount} expired subscription(s)`,
          );
        }
      },
      60 * 60 * 1000,
    ); // Check every hour

    return () => clearInterval(interval);
  }, [checkAndHandleExpiredSubscriptions]);

  return { checkAndHandleExpiredSubscriptions };
}
