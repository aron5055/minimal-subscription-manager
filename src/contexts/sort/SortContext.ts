import type { SortType } from "@/lib/subs";
import { createContext } from "react";

export interface SortContextValue {
  sortType: SortType | null;
  setSortType: (sortType: SortType | null) => void;
}

export const SortContext = createContext<SortContextValue | undefined>(undefined);