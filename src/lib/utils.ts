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
  return root ? `https://www.google.com/s2/favicons?sz=128&domain=${root}` : "";
}
