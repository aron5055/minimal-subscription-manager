import { useSubscription } from "@/contexts/SubsContext";
import { isSubscriptionExpired } from "@/lib/date";
import type { Subscription } from "@/types/types";
import { useEffect } from "react";

/**
 * Hook to automatically pause expired subscriptions
 * Checks for expired subscriptions on mount and sets up periodic checks
 */
export function useExpiredSubscriptions() {
  const [{ subs }, dispatch] = useSubscription();

  const checkAndPauseExpiredSubscriptions = () => {
    // Find all active subscriptions that have expired
    const expiredSubs = subs.filter((sub: Subscription) => {
      return sub.status === "active" && isSubscriptionExpired(sub);
    });

    // Pause each expired subscription
    expiredSubs.forEach((sub) => {
      dispatch({
        type: "UPDATE_SUB",
        payload: {
          ...sub,
          status: "paused",
        },
      });
    });

    return expiredSubs.length;
  };

  useEffect(() => {
    // Check immediately when the hook is mounted
    const pausedCount = checkAndPauseExpiredSubscriptions();

    if (pausedCount > 0) {
      console.log(
        `Automatically paused ${pausedCount} expired subscription(s)`,
      );
    }

    // Set up periodic checks (every hour)
    const interval = setInterval(
      () => {
        const pausedCount = checkAndPauseExpiredSubscriptions();
        if (pausedCount > 0) {
          console.log(
            `Automatically paused ${pausedCount} expired subscription(s)`,
          );
        }
      },
      60 * 60 * 1000,
    ); // Check every hour

    return () => clearInterval(interval);
  }, [subs, dispatch]);

  return { checkAndPauseExpiredSubscriptions };
}
