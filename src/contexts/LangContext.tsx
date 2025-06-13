import en from "@/assets/i18n/en.json";
import zh from "@/assets/i18n/zh.json";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from "react";

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
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("i18n");
    if (saved === "zh" || saved === "en") return saved;
    return navigator.language.startsWith("zh") ? "zh" : "en";
  });

  useEffect(() => {
    localStorage.setItem("i18n", lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ t: resources[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export function useI18n() {
  return useContext(LangContext);
}
