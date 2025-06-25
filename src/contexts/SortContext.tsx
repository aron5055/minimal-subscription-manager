import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { SortType } from "@/lib/subs";
import { createContext, useContext, type ReactNode } from "react";

type SortContextType = {
  sortType: SortType | null;
  setSortType: (sortType: SortType | null) => void;
};

const SortContext = createContext<SortContextType | undefined>(undefined);

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

export function useSort() {
  const context = useContext(SortContext);
  if (context === undefined) {
    throw new Error("useSort must be used within a SortProvider");
  }
  return context;
}
