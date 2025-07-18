import type { Category, State, Subscription } from "@/types/types";

// Mock category data
export const mockCategories: Record<string, Category> = {
  entertainment: {
    id: "entertainment",
    name: "Entertainment",
  },
  productivity: {
    id: "productivity",
    name: "Productivity",
  },
  news: {
    id: "news",
    name: "News & Media",
  },
  cloud: {
    id: "cloud",
    name: "Cloud Services",
  },
  development: {
    id: "development",
    name: "Development Tools",
  },
  health: {
    id: "health",
    name: "Health & Fitness",
  },
};

// Mock subscription data
export const mockSubscriptions: Subscription[] = [
  {
    id: "netflix-001",
    title: "Netflix",
    price: 15.99,
    currencyCode: "USD",
    icon: { type: "builtin", name: "video" },
    url: "https://netflix.com",
    notes: "Family plan",
    color: "#E50914",
    startDate: "2025-01-01",
    endDate: null,
    cycle: { num: 1, type: "month(s)" },
    categoryId: "entertainment",
    status: "active",
    autoRenew: true,
  },
  {
    id: "spotify-002",
    title: "Spotify Premium",
    price: 9.99,
    currencyCode: "USD",
    icon: { type: "builtin", name: "music" },
    url: "https://spotify.com",
    notes: "Personal plan",
    color: "#1DB954",
    startDate: "2025-01-15",
    endDate: null,
    cycle: { num: 1, type: "month(s)" },
    categoryId: "entertainment",
    status: "active",
    autoRenew: true,
  },
  {
    id: "notion-003",
    title: "Notion Pro",
    price: 8.0,
    currencyCode: "USD",
    icon: { type: "builtin", name: "productivity" },
    url: "https://notion.so",
    notes: "Personal Pro version",
    color: "#000000",
    startDate: "2025-02-01",
    endDate: null,
    cycle: { num: 1, type: "month(s)" },
    categoryId: "productivity",
    status: "active",
    autoRenew: true,
  },
  {
    id: "chatgpt-004",
    title: "ChatGPT Plus",
    price: 20.0,
    currencyCode: "USD",
    icon: {
      type: "favicon",
      url: "https://chatgpt.com",
    },
    url: "https://chatgpt.com",
    notes: "GPT-4 access",
    color: "#10A37F",
    startDate: "2025-01-10",
    endDate: null,
    cycle: { num: 1, type: "month(s)" },
    categoryId: "productivity",
    status: "active",
    autoRenew: true,
  },
  {
    id: "github-005",
    title: "GitHub Pro",
    price: 4.0,
    currencyCode: "USD",
    icon: { type: "builtin", name: "development" },
    url: "https://github.com",
    notes: "Code repository hosting",
    color: "#24292E",
    startDate: "2025-01-01",
    endDate: null,
    cycle: { num: 1, type: "month(s)" },
    categoryId: "development",
    status: "active",
    autoRenew: true,
  },
  {
    id: "icloud-006",
    title: "iCloud+",
    price: 2.99,
    currencyCode: "USD",
    icon: { type: "builtin", name: "cloud" },
    url: "https://icloud.com",
    notes: "200GB storage",
    color: "#007AFF",
    startDate: "2025-01-05",
    endDate: null,
    cycle: { num: 1, type: "month(s)" },
    categoryId: "cloud",
    status: "active",
    autoRenew: true,
  },
  {
    id: "nytimes-007",
    title: "New York Times",
    price: 17.0,
    currencyCode: "USD",
    icon: { type: "builtin", name: "news" },
    url: "https://nytimes.com",
    notes: "Digital subscription",
    color: "#000000",
    startDate: "2025-02-15",
    endDate: null,
    cycle: { num: 1, type: "month(s)" },
    categoryId: "news",
    status: "active",
    autoRenew: true,
  },
  {
    id: "fitness-009",
    title: "Nike Training Club",
    price: 14.99,
    currencyCode: "USD",
    icon: { type: "builtin", name: "health" },
    url: "https://nike.com",
    notes: "Premium fitness plan",
    color: "#FF6900",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    cycle: { num: 1, type: "month(s)" },
    categoryId: "health",
    status: "active",
    autoRenew: true,
  },
  {
    id: "steam-010",
    title: "Steam",
    price: 59.99,
    currencyCode: "USD",
    icon: { type: "builtin", name: "gaming" },
    url: "https://store.steampowered.com",
    notes: "Annual game pass",
    color: "#1B2838",
    startDate: "2025-01-01",
    endDate: null,
    cycle: { num: 1, type: "year(s)" },
    categoryId: "entertainment",
    status: "active",
    autoRenew: true,
  },
  {
    id: "dropbox-011",
    title: "Dropbox Plus",
    price: 9.99,
    currencyCode: "USD",
    icon: { type: "builtin", name: "cloud" },
    url: "https://dropbox.com",
    notes: "2TB cloud storage",
    color: "#0061FF",
    startDate: "2025-02-01",
    endDate: null,
    cycle: { num: 1, type: "month(s)" },
    categoryId: "cloud",
    status: "paused",
    autoRenew: true,
  },
  {
    id: "figma-012",
    title: "Figma Professional",
    price: 12.0,
    currencyCode: "USD",
    icon: { type: "builtin", name: "development" },
    url: "https://figma.com",
    notes: "Design collaboration tool",
    color: "#F24E1E",
    startDate: "2025-01-15",
    endDate: null,
    cycle: { num: 1, type: "month(s)" },
    categoryId: "development",
    status: "active",
    autoRenew: true,
  },
];

// Complete mock state
export const mockState: State = {
  subs: mockSubscriptions,
  cats: mockCategories,
};
