export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Subscription {
  title: string;
  price: number;
  currencyCode: string;
  icon: {
    type: "favicon" | "builtin" | "custom";
    value: "string";
  };
  url?: string;
  notes?: string;
  color: string;
  startDate: string;
  cycle: "month" | "year" | "other";
  tags: Tag[];
  status: "active" | "paused";
}
