import { useSubscription } from "@/contexts/SubsContext";
import { getTextColorForBackground } from "@/lib/color";
import { cn } from "@/lib/ui";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { forwardRef } from "react";
import { SubscriptionInfo } from "./SubscriptionInfo";

interface CardItemProps {
  id: UniqueIdentifier;
}

export const CardItem = forwardRef<HTMLDivElement, CardItemProps>(
  ({ id }, ref) => {
    const [{ subs }] = useSubscription();

    // Find the subscription by ID
    const sub = subs.find((subscription) => subscription.id === id);

    if (!sub) {
      return null;
    }

    const textColor = getTextColorForBackground(sub.color);

    return (
      <div
        ref={ref}
        className={cn(
          "w-full p-4 border rounded-lg shadow-lg bg-white",
          textColor,
        )}
        style={{
          backgroundColor: sub.color,
        }}
      >
        <SubscriptionInfo sub={sub} />
      </div>
    );
  },
);
