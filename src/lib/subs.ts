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
  month: Nullable<boolean>;
  year: Nullable<boolean>;
  day: Nullable<boolean>;
  category: string[];
};

export function filterSubs(subs: Subscription[], filters: FilterType) {
  return subs.filter((sub) => {
    const statusFilters: string[] = [];
    if (filters.active) {
      statusFilters.push("active");
    }
    if (filters.paused) {
      statusFilters.push("paused");
    }

    const typeFilters: string[] = [];
    if (filters.month) {
      typeFilters.push("month(s)");
    }
    if (filters.year) {
      typeFilters.push("year(s)");
    }
    if (filters.day) {
      typeFilters.push("day(s)");
    }

    const conditions = [
      statusFilters.length === 0 || statusFilters.includes(sub.status),
      filters.category.length === 0 ||
        filters.category.includes(sub.categoryId),
      typeFilters.length === 0 || typeFilters.includes(sub.cycle.type),
    ];
    return conditions.every(Boolean);
  });
}
