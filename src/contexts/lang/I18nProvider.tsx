import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useMemo, type ReactNode } from "react";
import { z } from "zod/v4";
import { LangContext, resources, type Lang } from "./LangContext";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useLocalStorage<Lang>("i18n", () => {
    if (navigator.language.startsWith("zh")) {
      z.config(z.locales.zhCN());
      return "zh";
    } else {
      z.config(z.locales.en());
      return "en";
    }
  });

  useEffect(() => {
    if (lang === "zh") {
      z.config(z.locales.zhCN());
      document.documentElement.lang = "zh-CN";
      document.title = "极简订阅管理器";
    } else {
      z.config(z.locales.en());
      document.documentElement.lang = "en";
      document.title = "Minimal Subscription Manager";
    }
  }, [lang]);

  const value = useMemo(
    () => ({
      t: resources[lang],
      lang,
      setLang,
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
