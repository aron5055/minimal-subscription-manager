import type { State, Subscription } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { parse } from "tldts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function normalizeUrl(url: string): string {
  if (!/^https?:\/\//i.test(url)) {
    return "https://" + url;
  }
  return url;
}

function getRootDomain(urlStr: string): string {
  try {
    const normalized = normalizeUrl(urlStr);
    const { domain } = parse(normalized);
    return domain ?? "";
  } catch {
    return "";
  }
}

export function getFaviconUrl(urlStr: string): string {
  const root = getRootDomain(urlStr);
  return root ? `https://www.google.com/s2/favicons?domain=${root}&sz=128` : "";
}

export function exportData(state: State) {
  const blob = new Blob(
    [
      JSON.stringify(
        { schema: 1, exportedAt: new Date().toISOString(), data: state },
        null,
        2,
      ),
    ],
    { type: "application/json" },
  );

  const href = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), {
    href,
    download: `sub-${Date.now()}.json`,
  });
  a.click();
  URL.revokeObjectURL(href);
}

export function daysLeft(sub: Subscription): number | null {
  // If subscription is paused, return null
  if (sub.status === "paused") {
    return null;
  }

  // If subscription has ended, return null
  if (sub.endDate && new Date(sub.endDate) < new Date()) {
    return null;
  }

  const startDate = new Date(sub.startDate);
  const now = new Date();

  // Calculate the next billing date
  let nextBillingDate = new Date(startDate);

  while (nextBillingDate <= now) {
    switch (sub.cycle.type) {
      case "day(s)":
        nextBillingDate.setDate(nextBillingDate.getDate() + sub.cycle.num);
        break;
      case "month(s)":
        nextBillingDate.setMonth(nextBillingDate.getMonth() + sub.cycle.num);
        break;
      case "year(s)":
        nextBillingDate.setFullYear(
          nextBillingDate.getFullYear() + sub.cycle.num,
        );
        break;
    }
  }

  // If there's an end date and next billing would be after it, return null
  if (sub.endDate && nextBillingDate > new Date(sub.endDate)) {
    return null;
  }

  // Calculate days difference
  const timeDiff = nextBillingDate.getTime() - now.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
}

/**
 * Calculate if a color is light or dark based on its luminance
 * Returns true if the color is light (should use dark text)
 * Returns false if the color is dark (should use light text)
 */
export function isLightColor(color: string): boolean {
  // Remove # if present
  const hex = color.replace("#", "");

  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate luminance using the relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return true if light (luminance > 0.5)
  return luminance > 0.5;
}

/**
 * Get appropriate text color based on background color
 * Returns 'text-white' for dark backgrounds and 'text-black' for light backgrounds
 */
export function getTextColorForBackground(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? "text-black" : "text-white";
}

export function generateSoftColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 26) + 50; // 范围 50-75
  const lightness = Math.floor(Math.random() * 11) + 85; // 范围 85-95

  // Convert HSL to RGB
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 1 / 6) {
    r = c;
    g = x;
    b = 0;
  } else if (1 / 6 <= h && h < 2 / 6) {
    r = x;
    g = c;
    b = 0;
  } else if (2 / 6 <= h && h < 3 / 6) {
    r = 0;
    g = c;
    b = x;
  } else if (3 / 6 <= h && h < 4 / 6) {
    r = 0;
    g = x;
    b = c;
  } else if (4 / 6 <= h && h < 5 / 6) {
    r = x;
    g = 0;
    b = c;
  } else if (5 / 6 <= h && h < 1) {
    r = c;
    g = 0;
    b = x;
  }

  // Convert to 0-255 range and round
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  // Convert to hexadecimal
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
