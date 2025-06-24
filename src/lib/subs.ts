import type { Category, Subscription } from "@/types/types";

type SortType = "title" | "maxPrice" | "minPrice" | "category" | "date";

export function sortSubs(
  subs: Subscription[],
  type: SortType,
  category: Record<string, Category>,
) {
  switch (type) {
    case "title": {
      return subs.sort((a, b) => a.title.localeCompare(b.title));
    }
    case "maxPrice": {
      return subs.sort((a, b) => b.price - a.price);
    }
    case "minPrice": {
      return subs.sort((a, b) => a.price - b.price);
    }
    case "date": {
      return subs.sort((a, b) => a.startDate.localeCompare(b.startDate));
    }
    case "category": {
      return subs.sort((a, b) => {
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

type FilterType = "active" | "paused" | "category";

export function filterSubs(
  subs: Subscription[],
  type: FilterType,
  config: {
    category?: string;
    term?: string;
  },
) {
  switch (type) {
    case "active": {
      return subs.filter((sub) => sub.status === "active");
    }
    case "paused": {
      return subs.filter((sub) => sub.status === "paused");
    }
    case "category": {
      return subs.filter((sub) => sub.categoryId === config.category);
    }
    default: {
      return subs;
    }
  }
}
