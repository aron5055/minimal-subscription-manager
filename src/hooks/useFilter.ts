import type { FilterType } from "@/lib/subs";
import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useFilter() {
  const [filterType, setFilterType] = useLocalStorage<FilterType>(
    "filterType",
    {
      active: null,
      paused: null,
      category: [],
      month: null,
      year: null,
      day: null,
    },
  );

  const filterNums = useMemo(() => {
    let nums = 0;
    for (const value of Object.values(filterType)) {
      if (Array.isArray(value)) {
        nums += value.length;
      } else if (value !== null) {
        nums += 1;
      }
    }
    return nums;
  }, [filterType]);

  const resetFilter = () => {
    setFilterType({
      active: null,
      paused: null,
      category: [],
      month: null,
      year: null,
      day: null,
    });
  };

  return { filterType, setFilterType, resetFilter, filterNums };
}
