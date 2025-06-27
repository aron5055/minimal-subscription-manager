import { useI18n } from "@/contexts/lang";
import type { Category, Subscription } from "@/types/types";
import { Folder } from "lucide-react";

interface SheetContentProps {
  cats: Record<string, Category>;
  sub: Subscription;
}

export function SubscriptionContent({ cats, sub }: SheetContentProps) {
  const { t } = useI18n();
  const className = "flex items-center gap-3 p-3 bg-muted/20 rounded-md";

  return (
    <>
      <div className="space-y-4">
        <div className={className}>
          <Folder size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">
            {cats[sub.categoryId]?.name ?? t.analyse.uncategorized}
          </span>
        </div>

        <div className={className}>
          <span className="text-sm text-muted-foreground">
            {t.subscription.form.cycle.label}:
          </span>
          <span className="text-sm font-medium">
            {`${sub.cycle.num} ${t.subscription.form.cycle.map[sub.cycle.type]}`}
          </span>
        </div>

        <div className={className}>
          <span className="text-sm text-muted-foreground">
            {t.subscription.form.autoRenew}:
          </span>
          <span
            className={`text-sm font-medium ${
              sub.autoRenew
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {sub.autoRenew ? "✓" : "✗"}
          </span>
        </div>

        {sub.notes && (
          <div className="p-4 bg-muted/20 rounded-md space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              {t.subscription.form.notes}
            </div>
            <div className="text-sm whitespace-pre-wrap leading-relaxed">
              {sub.notes}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
