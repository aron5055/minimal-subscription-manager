import en from "@/assets/i18n/en.json";
import zh from "@/assets/i18n/zh.json";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext, type ReactNode } from "react";
import { z } from "zod/v4";

export type Lang = "en" | "zh";

export type Translation = typeof zh;

const resources: Record<Lang, Translation> = {
  en,
  zh,
};

const LangContext = createContext<{
  t: Translation;
  lang: Lang;
  setLang: (l: Lang) => void;
}>({
  t: resources.en,
  lang: "en",
  setLang: () => {},
});

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

export function useI18n() {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
