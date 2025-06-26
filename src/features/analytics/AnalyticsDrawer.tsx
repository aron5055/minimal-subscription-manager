import { DrawerWrapper } from "@/components/common/DrawerWrapper";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useI18n } from "@/contexts/LangContext";
import { useAllCats, useSubscription } from "@/contexts/SubsContext";
import { generateSoftColor } from "@/lib/color";
import { calculateMonthlyCost, calculateYearlyCost } from "@/lib/cost";
import { ChartPie } from "lucide-react";
import { useMemo, useState } from "react";
import { ChartComponent } from "./ChartComponent";

export default function AnalyticsDrawer() {
  const { t } = useI18n();
  const [{ subs }] = useSubscription();
  const categories = useAllCats();
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");

  const activeSubscriptions = useMemo(
    () => subs.filter((sub) => sub.status === "active"),
    [subs],
  );

  const subscriptionData = useMemo(() => {
    if (!activeSubscriptions.length) return [];

    return activeSubscriptions
      .map((sub) => ({
        name: sub.title,
        value:
          period === "monthly"
            ? calculateMonthlyCost(sub)
            : calculateYearlyCost(sub),
        color: generateSoftColor(),
      }))
      .filter((item) => item.value > 0);
  }, [activeSubscriptions, period]);

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
          ? calculateMonthlyCost(sub)
          : calculateYearlyCost(sub);

      categoryMap.set(
        categoryName,
        (categoryMap.get(categoryName) || 0) + cost,
      );
    });

    return Array.from(categoryMap.entries())
      .map(([name, value]) => ({
        name,
        value,
        color: generateSoftColor(),
      }))
      .filter((item) => item.value > 0);
  }, [activeSubscriptions, categories, period]);

  return (
    <DrawerWrapper
      title={t.analyse.label}
      description={t.analyse.description}
      trigger={
        <Button variant="ghost" aria-label={t.analyse.label}>
          <ChartPie style={{ width: "24px", height: "24px" }} />
        </Button>
      }
    >
      <ScrollArea className="h-[calc(90vh-120px)] px-4">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-center">
            <ToggleGroup
              type="single"
              value={period}
              onValueChange={(value) =>
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
          />
          <ChartComponent
            data={categoryData}
            title={period === "monthly" ? t.analyse.monthly : t.analyse.yearly}
          />
        </div>
      </ScrollArea>
    </DrawerWrapper>
  );
}
