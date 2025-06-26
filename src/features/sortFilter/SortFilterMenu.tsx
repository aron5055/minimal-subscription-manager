import { DrawerWrapper } from "@/components/common/DrawerWrapper";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFilter } from "@/contexts/FilterContext";
import { useI18n } from "@/contexts/LangContext";
import { useSort } from "@/contexts/SortContext";
import { ArrowUpDown, RotateCcw } from "lucide-react";
import { useState } from "react";
import { FilterOptions } from "./FilterOptions";
import { SortOptions } from "./SortOptions";

export function SortFilterMenu() {
  const { t } = useI18n();
  const { setSortType } = useSort();
  const { resetFilter, filterNums } = useFilter();
  const [open, setOpen] = useState(false);

  const resetAll = () => {
    setSortType(null);
    resetFilter();
    setOpen(false);
  };

  const trigger = (
    <Button
      variant="ghost"
      className="relative focus:outline-none hover:bg-accent hover:text-accent-foreground rounded-lg p-2 transition-colors duration-150"
      aria-label={t.accessibility.btn.sortFilter}
    >
      <ArrowUpDown
        style={{
          width: "24px",
          height: "24px",
        }}
      />
      {filterNums > 0 && (
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full flex items-center justify-center">
          <span className="text-[8px] text-primary-foreground font-medium">
            {filterNums > 9 ? "9+" : filterNums}
          </span>
        </div>
      )}
    </Button>
  );

  const footer = (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2 flex-1"
      onClick={resetAll}
    >
      <RotateCcw size={16} />
      {t.common.reset}
    </Button>
  );

  return (
    <DrawerWrapper
      title={`${t.sort.label}&${t.filter.label}`}
      description={`${t.sort.label}&${t.filter.label}`}
      trigger={trigger}
      footer={footer}
      open={open}
      onOpenChange={setOpen}
    >
      <ScrollArea className="h-[calc(50vh)] px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
          <SortOptions />
          <FilterOptions />
        </div>
      </ScrollArea>
    </DrawerWrapper>
  );
}
