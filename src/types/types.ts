import type { BuiltinIcon } from "@/lib/genericIcons";

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export type Icon =
  | { type: "favicon"; url: string }
  | { type: "builtin"; name: BuiltinIcon }
  | { type: "text"; text: string }
  | { type: "empty" };

export interface Category {
  id: string;
  name: string;
  // color?: string
}

export interface Subscription {
  id: string;
  title: string;
  price: number;
  currencyCode: string;
  icon: Icon;
  url?: string;
  notes?: string;
  color: string;
  startDate: string;
  cycle: "month" | "year" | "other";
  categoryId: string;
  status: "active" | "paused";
}

export interface State {
  subs: Subscription[];
  cats: Record<string, Category>;
}
