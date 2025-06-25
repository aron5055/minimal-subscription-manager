import type { Category, Subscription } from "@/types/types";

export type SortType =
  | "title"
  | "priceMax"
  | "priceMin"
  | "category"
  | "date"
  | null;

export function sortSubs(
  subs: Subscription[],
  type: SortType,
  category: Record<string, Category>,
) {
  const sortedSubs = [...subs]; // 创建副本避免修改原数组

  switch (type) {
    case "title": {
      return sortedSubs.sort((a, b) => a.title.localeCompare(b.title));
    }
    case "priceMax": {
      return sortedSubs.sort((a, b) => b.price - a.price);
    }
    case "priceMin": {
      return sortedSubs.sort((a, b) => a.price - b.price);
    }
    case "date": {
      return sortedSubs.sort((a, b) => a.startDate.localeCompare(b.startDate));
    }
    case "category": {
      return sortedSubs.sort((a, b) => {
        const categoryA = category[a.categoryId]?.name || "";
        const categoryB = category[b.categoryId]?.name || "";
        return categoryA.localeCompare(categoryB);
      });
    }
    default: {
      return subs;
    }
  }
}

type Nullable<T> = T | null;

export type FilterType = {
  active: Nullable<boolean>;
  paused: Nullable<boolean>;
  category: string[];
  month: Nullable<boolean>;
  year: Nullable<boolean>;
  day: Nullable<boolean>;
};

export function filterSubs(subs: Subscription[], filters: FilterType) {
  return subs.filter((sub) => {
    if (filters.active && sub.status !== "active") {
      return false;
    }
    if (filters.paused && sub.status !== "paused") {
      return false;
    }

    if (
      filters.category.length > 0 &&
      !filters.category.includes(sub.categoryId)
    ) {
      return false;
    }

    if (filters.month && sub.cycle.type !== "month(s)") {
      return false;
    }
    if (filters.year && sub.cycle.type !== "year(s)") {
      return false;
    }
    if (filters.day && sub.cycle.type !== "day(s)") {
      return false;
    }

    return true;
  });
}
