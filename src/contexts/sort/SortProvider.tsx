import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { SortType } from "@/lib/subs";
import { type ReactNode } from "react";
import { SortContext } from "./SortContext";

export function SortProvider({ children }: { children: ReactNode }) {
  const [sortType, setSortType] = useLocalStorage<SortType | null>(
    "sortType",
    null,
  );

  return (
    <SortContext.Provider value={{ sortType, setSortType }}>
      {children}
    </SortContext.Provider>
  );
}