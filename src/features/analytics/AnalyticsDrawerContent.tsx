import { DrawerWrapper } from "@/components/common/DrawerWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCurrency } from "@/contexts/currency";
import { useI18n } from "@/contexts/lang";
import { useAllCats, useSubscription } from "@/contexts/subscription";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { generateSoftColor } from "@/lib/color";
import { calculateCost, convertCurrency } from "@/lib/cost";
import { useMemo, useState } from "react";
import { ChartComponent } from "./ChartComponent";

interface AnalyticsDrawerContentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AnalyticsDrawerContent({
  open,
  onOpenChange,
}: AnalyticsDrawerContentProps) {
  const { t } = useI18n();
  const { state } = useSubscription();
  const categories = useAllCats();
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const { currency } = useCurrency();
  const { rates } = useExchangeRate(currency);

  const activeSubscriptions = useMemo(
    () => state.subs.filter((sub) => sub.status === "active"),
    [state.subs],
  );

  const subscriptionData = useMemo(() => {
    if (!activeSubscriptions.length) return [];

    return activeSubscriptions
      .map((sub) => {
        const cost =
          period === "monthly"
            ? calculateCost(sub, "monthly")
            : calculateCost(sub, "yearly");

        const convertedCost = convertCurrency(cost, sub.currencyCode, rates);

        return {
          name: sub.title,
          value: convertedCost,
          color: generateSoftColor(),
        };
      })
      .filter((item) => item.value > 0);
  }, [activeSubscriptions, period, rates]);

  const categoryData = useMemo(() => {
    if (!activeSubscriptions.length) return [];

    const categoryMap = new Map<string, number>();

    activeSubscriptions.forEach((sub) => {
      const categoryId = sub.categoryId || "uncategorized";
      const categoryName =
        categories.find((cat) => cat.id === categoryId)?.name ||
        t.analyse.uncategorized;

      const cost =
        period === "monthly"
          ? calculateCost(sub, "monthly")
          : calculateCost(sub, "yearly");

      const convertedCost = convertCurrency(cost, sub.currencyCode, rates);

      categoryMap.set(
        categoryName,
        (categoryMap.get(categoryName) || 0) + convertedCost,
      );
    });

    return Array.from(categoryMap.entries())
      .map(([name, value]) => ({
        name,
        value,
        color: generateSoftColor(),
      }))
      .filter((item) => item.value > 0);
  }, [activeSubscriptions, categories, period, rates, t.analyse.uncategorized]);

  return (
    <DrawerWrapper
      title={t.analyse.label}
      description={t.analyse.description}
      open={open}
      onOpenChange={onOpenChange}
    >
      <ScrollArea className="h-[calc(90vh-120px)] px-4">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-center">
            <ToggleGroup
              type="single"
              value={period}
              onValueChange={(value: string) =>
                value && setPeriod(value as "monthly" | "yearly")
              }
              className="grid grid-cols-2 w-full max-w-xs mt-2"
            >
              <ToggleGroupItem value="monthly" className="text-xs sm:text-sm">
                {t.analyse.tabs.monthly}
              </ToggleGroupItem>
              <ToggleGroupItem value="yearly" className="text-xs sm:text-sm">
                {t.analyse.tabs.yearly}
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
          <ChartComponent
            data={subscriptionData}
            title={period === "monthly" ? t.analyse.monthly : t.analyse.yearly}
            currency={currency}
          />
          <ChartComponent
            data={categoryData}
            title={period === "monthly" ? t.analyse.monthly : t.analyse.yearly}
            currency={currency}
          />
        </div>
      </ScrollArea>
    </DrawerWrapper>
  );
}
