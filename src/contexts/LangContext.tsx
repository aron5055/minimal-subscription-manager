import en from "@/assets/i18n/en.json";
import zh from "@/assets/i18n/zh.json";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext, type FC, type ReactNode } from "react";

export type Lang = "en" | "zh";

type Translation = typeof zh;

const resources: Record<Lang, Translation> = { en, zh };

const LangContext = createContext<{
  t: Translation;
  setLang: (l: Lang) => void;
}>({
  t: resources.en,
  setLang: () => {},
});

export const I18nProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useLocalStorage<Lang>("i18n", () => {
    return navigator.language.startsWith("zh") ? "zh" : "en";
  });

  return (
    <LangContext.Provider value={{ t: resources[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export function useI18n() {
  return useContext(LangContext);
}
