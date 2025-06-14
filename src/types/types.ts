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

export interface Subscription {
  title: string;
  price: number;
  currencyCode: string;
  icon: Icon;
  url?: string;
  notes?: string;
  color: string;
  startDate: string;
  cycle: "month" | "year" | "other";
  tags: Tag[];
  status: "active" | "paused";
}
