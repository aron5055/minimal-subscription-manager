import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { FilterType } from "@/lib/subs";
import {
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { FilterContext } from "./FilterContext";

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filterType, setFilterType] = useLocalStorage<FilterType>(
    "filterType",
    {
      active: null,
      paused: null,
      month: null,
      year: null,
      day: null,
      category: [],
    },
  );
  const [filterNums, setFilterNums] = useState(0);

  useMemo(() => {
    let nums = 0;
    for (const value of Object.values(filterType)) {
      if (Array.isArray(value)) {
        nums += value.length;
      } else if (value !== null) {
        nums += 1;
      }
    }
    setFilterNums(nums);
  }, [filterType]);

  const resetFilter = () => {
    setFilterType({
      active: null,
      paused: null,
      month: null,
      year: null,
      day: null,
      category: [],
    });
  };

  return (
    <FilterContext.Provider
      value={{ filterType, setFilterType, resetFilter, filterNums }}
    >
      {children}
    </FilterContext.Provider>
  );
}