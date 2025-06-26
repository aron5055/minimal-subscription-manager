import { useLocalStorage } from "@/hooks/useLocalStorage";
import { type ReactNode } from "react";
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

  return (
    <LangContext.Provider value={{ t: resources[lang], lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}