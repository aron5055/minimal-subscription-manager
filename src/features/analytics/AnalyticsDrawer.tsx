import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useI18n } from "@/contexts/LangContext";
import { useAllCats, useSubscription } from "@/contexts/SubsContext";
import { generateSoftColor } from "@/lib/color";
import { calculateMonthlyCost, calculateYearlyCost } from "@/lib/cost";
import { ChartPie } from "lucide-react";
import { useMemo, useState } from "react";
import { ChartComponent } from "./ChartComponent";

//TODO: fix Blocked aria-hidden on an element because its descendant retained focus
export default function AnalyticsDrawer() {
  const { t } = useI18n();
  const [{ subs }] = useSubscription();
  const categories = useAllCats();
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");

  const activeSubscriptions = useMemo(
    () => subs.filter((sub) => sub.status === "active"),
    [subs],
  );

  // 计算按订阅分组的数据
  const subscriptionData = useMemo(() => {
    if (!activeSubscriptions.length) return [];

    return activeSubscriptions
      .map((sub) => ({
        name: sub.title,
        value:
          period === "monthly"
            ? calculateMonthlyCost(sub)
            : calculateYearlyCost(sub),
        color: sub.color || generateSoftColor(),
      }))
      .filter((item) => item.value > 0);
  }, [activeSubscriptions, period]);

  // 计算按分类分组的数据
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
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" aria-label={t.analyse.label}>
          <ChartPie style={{ width: "24px", height: "24px" }} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-6xl">
          <DrawerHeader className="pb-4">
            <DrawerTitle className="text-center">{t.analyse.label}</DrawerTitle>
            <DrawerDescription className="sr-only">
              {t.analyse.description}
            </DrawerDescription>
          </DrawerHeader>

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
                  <ToggleGroupItem
                    value="monthly"
                    className="text-xs sm:text-sm"
                  >
                    {t.analyse.tabs.monthly}
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="yearly"
                    className="text-xs sm:text-sm"
                  >
                    {t.analyse.tabs.yearly}
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
              <ChartComponent
                data={subscriptionData}
                title={
                  period === "monthly" ? t.analyse.monthly : t.analyse.yearly
                }
              />
              <ChartComponent
                data={categoryData}
                title={
                  period === "monthly" ? t.analyse.monthly : t.analyse.yearly
                }
              />
            </div>
          </ScrollArea>

          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">{t.common.close}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
