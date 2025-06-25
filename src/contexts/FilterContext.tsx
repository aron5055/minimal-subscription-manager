import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { FilterType } from "@/lib/subs";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type FilterContextType = {
  filterType: FilterType;
  setFilterType: (filterType: FilterType) => void;
  resetFilter: () => void;
  filterNums: number;
};

const FilterContext = createContext<FilterContextType>({
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

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
