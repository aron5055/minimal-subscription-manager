import { DrawerWrapper } from "@/components/common/DrawerWrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DrawerClose } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFilter } from "@/contexts/FilterContext";
import { useI18n } from "@/contexts/LangContext";
import { useSort } from "@/contexts/SortContext";
import type { SortType } from "@/lib/subs";
import { ArrowUpDown, Filter, RotateCcw } from "lucide-react";
import { useState } from "react";

export function SortFilterMenu() {
  const { t } = useI18n();
  const { sortType, setSortType } = useSort();
  const { filterType, setFilterType, resetFilter, filterNums } = useFilter();
  const [open, setOpen] = useState(false);

  const resetAll = () => {
    setSortType(null);
    resetFilter();
    setOpen(false);
  };

  const sortBy = [
    { id: "sort-title", label: t.sort.by.title, value: "title" },
    { id: "sort-date", label: t.sort.by.date, value: "date" },
    { id: "sort-price-max", label: t.sort.by.priceMax, value: "priceMax" },
    { id: "sort-price-min", label: t.sort.by.priceMin, value: "priceMin" },
    { id: "sort-category", label: t.sort.by.category, value: "category" },
  ];

  return (
    <DrawerWrapper
      title={`${t.sort.label}&${t.filter.label}`}
      description={`${t.sort.label}&${t.filter.label}`}
      trigger={
        <Button
          variant="ghost"
          className="relative focus:outline-none hover:bg-accent hover:text-accent-foreground rounded-lg p-2 transition-colors duration-150"
        >
          <ArrowUpDown size={24} />
          {filterNums > 0 && (
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full flex items-center justify-center">
              <span className="text-[8px] text-primary-foreground font-medium">
                {filterNums > 9 ? "9+" : filterNums}
              </span>
            </div>
          )}
        </Button>
      }
      footer={
        <div className="flex gap-3 w-full max-w-md mx-auto">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 flex-1"
            onClick={resetAll}
          >
            <RotateCcw size={16} />
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">{t.common.close}</Button>
          </DrawerClose>
        </div>
      }
      open={open}
      onOpenChange={setOpen}
    >
      <ScrollArea className="h-[calc(90vh-120px)] px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <ArrowUpDown size={16} className="text-primary" />
              <Label className="text-base font-medium">{t.sort.label}</Label>
            </div>
            <RadioGroup
              value={sortType}
              onValueChange={(value) => setSortType(value as SortType)}
            >
              {sortBy.map(({ id, label, value }) => (
                <div
                  key={id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={value} id={id} />
                  <Label htmlFor={id} className="text-sm cursor-pointer flex-1">
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter size={16} className="text-primary" />
              <Label className="text-base font-medium">{t.filter.label}</Label>
            </div>
            <div className="flex gap-2 items-center mb-1">
              <Checkbox
                id="filter-active"
                checked={filterType.active === true}
                onCheckedChange={(checked) =>
                  setFilterType({
                    ...filterType,
                    active:
                      checked === true
                        ? true
                        : checked === false
                          ? false
                          : null,
                  })
                }
              />
              <Label htmlFor="filter-active">{t.filter.by.active}</Label>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox
                id="filter-paused"
                checked={filterType.paused === true}
                onCheckedChange={(checked) =>
                  setFilterType({
                    ...filterType,
                    paused:
                      checked === true
                        ? true
                        : checked === false
                          ? false
                          : null,
                  })
                }
              />
              <Label htmlFor="filter-paused">{t.filter.by.paused}</Label>
            </div>
            <div>
              <Label>{t.filter.by.category}</Label>
            </div>
          </div>
        </div>
      </ScrollArea>
    </DrawerWrapper>
  );
}
