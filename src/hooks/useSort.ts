import type { SortType } from "@/lib/subs";
import { useLocalStorage } from "./useLocalStorage";

export function useSort() {
  const [sortType, setSortType] = useLocalStorage<SortType>("sortType", null);

  return { sortType, setSortType };
}
