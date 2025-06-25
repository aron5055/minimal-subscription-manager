import { Label } from "@/components/ui/label";
import { useFilter } from "@/contexts/FilterContext";
import { useI18n } from "@/contexts/LangContext";
import { useAllCats } from "@/contexts/SubsContext";
import type { FilterType } from "@/lib/subs";
import { Filter } from "lucide-react";
import { CheckboxField } from "./CheckboxField";

export function FilterOptions() {
  const { t } = useI18n();
  const categories = useAllCats();
  const { filterType, setFilterType, filterNums } = useFilter();
  const filterKeys = Object.keys(filterType) as (keyof FilterType)[];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Filter size={16} className="text-primary" />
        <div className="flex gap-1">
          <Label className="text-base font-medium">{t.filter.label}</Label>
          {filterNums > 0 && (
            <div className="h-3 w-3 bg-primary rounded-full flex items-center justify-center">
              <span className="text-[8px] text-primary-foreground font-medium">
                {filterNums > 9 ? "9+" : filterNums}
              </span>
            </div>
          )}
        </div>
      </div>
      <Label className="text-sm font-medium text-muted-foreground my-2 block">
        {t.filter.by.status}
      </Label>
      {filterKeys.slice(0, 2).map((status) => (
        <CheckboxField
          key={status}
          checkId={status}
          label={t.filter.by[status]}
          checked={filterType[status] === true}
          onCheckedChange={(checked) =>
            setFilterType({
              ...filterType,
              [status]: checked === true ? true : null,
            })
          }
        />
      ))}
      <Label className="text-sm font-medium text-muted-foreground my-2 block">
        {t.filter.by.date}
      </Label>
      {filterKeys.slice(2, 5).map((timeunit) => (
        <CheckboxField
          key={timeunit}
          checkId={timeunit}
          label={t.filter.by[timeunit]}
          checked={filterType[timeunit] === true}
          onCheckedChange={(checked) =>
            setFilterType({
              ...filterType,
              [timeunit]: checked === true ? true : null,
            })
          }
        />
      ))}
      <Label className="text-sm font-medium text-muted-foreground my-2 block">
        {t.filter.by.category}
      </Label>
      <div>
        {categories.map((cat) => (
          <CheckboxField
            key={cat.id}
            checkId={cat.id}
            label={cat.name}
            checked={filterType.category.includes(cat.id)}
            onCheckedChange={(checked) => {
              const newCategories = checked
                ? [...filterType.category, cat.id]
                : filterType.category.filter((id) => id !== cat.id);
              setFilterType({
                ...filterType,
                category: newCategories,
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}
