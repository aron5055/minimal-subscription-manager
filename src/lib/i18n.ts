import { z } from "zod/v4";

export type Lang = "en" | "zh" | "jp";

// Language configuration mapping
export const LANG_CONFIG = {
  zh: {
    locale: z.locales.zhCN,
    htmlLang: "zh-CN",
    title: "简单订阅管理器",
  },
  jp: {
    locale: z.locales.ja || z.locales.en, // Fallback to English if Japanese is not available
    htmlLang: "ja",
    title: "シンプルサブスクリプション管理",
  },
  en: {
    locale: z.locales.en,
    htmlLang: "en",
    title: "Simple Subscription Manager",
  },
} as const;

/**
 * Detects the preferred language based on navigator.language
 * @returns The detected language code
 */
export function detectLanguage(): Lang {
  const navigatorLang = navigator.language.toLowerCase();

  // Check for Chinese variants
  if (navigatorLang.startsWith("zh")) {
    return "zh";
  }

  // Check for Japanese variants
  if (navigatorLang.startsWith("ja")) {
    return "jp";
  }

  // Default to English
  return "en";
}

/**
 * Configures zod locale and document properties for a given language
 * @param lang - The language to configure
 */
export function configureLanguage(lang: Lang): void {
  const config = LANG_CONFIG[lang];

  // Configure zod locale
  z.config(config.locale());

  // Update document properties
  document.documentElement.lang = config.htmlLang;
  document.title = config.title;
}

/**
 * Gets the display name for a language
 * @param lang - The language code
 * @returns The display name of the language
 */
export function getLanguageDisplayName(lang: Lang): string {
  const displayNames = {
    en: "English",
    zh: "简体中文",
    jp: "日本語",
  };

  return displayNames[lang];
}
