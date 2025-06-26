import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useI18n } from "@/contexts/lang";
import { useSort } from "@/contexts/sort";
import type { SortType } from "@/lib/subs";
import { ArrowUpDown } from "lucide-react";

export function SortOptions() {
  const { t } = useI18n();
  const { sortType, setSortType } = useSort();
  const sortBy = [
    { id: "sort-title", label: t.sort.by.title, value: "title" },
    { id: "sort-date", label: t.sort.by.date, value: "date" },
    { id: "sort-price-max", label: t.sort.by.priceMax, value: "priceMax" },
    { id: "sort-price-min", label: t.sort.by.priceMin, value: "priceMin" },
    { id: "sort-category", label: t.sort.by.category, value: "category" },
  ];

  return (
    <div>
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
            className="flex items-center space-x-3 p-3 pl-4 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <RadioGroupItem value={value} id={id} />
            <Label htmlFor={id} className="text-sm cursor-pointer flex-1">
              {label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
