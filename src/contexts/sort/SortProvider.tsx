import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { SortType } from "@/lib/subs";
import { useMemo, type ReactNode } from "react";
import { SortContext } from "./SortContext";

export function SortProvider({ children }: { children: ReactNode }) {
  const [sortType, setSortType] = useLocalStorage<SortType | null>(
    "sortType",
    null,
  );

  const value = useMemo(
    () => ({ sortType, setSortType }),
    [sortType, setSortType],
  );
  return <SortContext.Provider value={value}>{children}</SortContext.Provider>;
}
