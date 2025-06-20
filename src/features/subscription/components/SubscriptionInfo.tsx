import { Avatar } from "@/components/ui/avatar";
import { daysLeft } from "@/lib/date";
import { renderIcon } from "@/lib/icon";
import type { Subscription } from "@/types/types";
import getSymbolFromCurrency from "currency-symbol-map";

export function SubscriptionInfo({ sub }: { sub: Subscription }) {
  return (
    <div className="flex items-center min-w-0 flex-1">
      <Avatar
        className="size-12 sm:size-14 lg:size-16 mr-3 flex-shrink-0 text-black"
        key={
          sub.icon.type === "builtin"
            ? `bulitin-${sub.icon.name}`
            : sub.icon.type
        }
      >
        {renderIcon(sub.icon)}
      </Avatar>
      <div className="min-w-0 flex-1">
        <h3 className="text-base sm:text-lg font-semibold truncate">
          {sub.title}
        </h3>
        <p className="text-sm opacity-75 mt-1">
          <span className="font-medium">{daysLeft(sub)}</span> days left
        </p>
      </div>
      <div>{`${sub.price.toFixed(2)} ${getSymbolFromCurrency(sub.currencyCode)}`}</div>
    </div>
  );
}
