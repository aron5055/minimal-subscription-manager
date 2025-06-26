import type { FilterType } from "@/lib/subs";
import { createContext } from "react";

export interface FilterContextValue {
  filterType: FilterType;
  setFilterType: (filterType: FilterType) => void;
  resetFilter: () => void;
  filterNums: number;
}

export const FilterContext = createContext<FilterContextValue>({
  filterType: {
    active: null,
    paused: null,
    category: [],
    month: null,
    year: null,
    day: null,
  },
  setFilterType: () => {},
  resetFilter: () => {},
  filterNums: 0,
});