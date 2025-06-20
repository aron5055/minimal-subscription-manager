import { parse } from "tldts";

/**
 * Normalize URL by adding https:// protocol if missing
 */
function normalizeUrl(url: string): string {
  if (!/^https?:\/\//i.test(url)) {
    return "https://" + url;
  }
  return url;
}

/**
 * Extract root domain from URL string
 */
function getRootDomain(urlStr: string): string {
  try {
    const normalized = normalizeUrl(urlStr);
    const { domain } = parse(normalized);
    return domain ?? "";
  } catch {
    return "";
  }
}

/**
 * Generate favicon URL for a given website URL
 * Uses a favicon service to get high-quality favicons
 */
export function getFaviconUrl(urlStr: string): string {
  const root = getRootDomain(urlStr);
  return root
    ? `https://favicons.fuzqing.workers.dev/api/getFavicon?url=https://${root}&size=128`
    : "";
}
