import en from "@/assets/i18n/en.json";
import zh from "@/assets/i18n/zh.json";
import { createContext } from "react";

export type Lang = "en" | "zh";

export type Translation = typeof zh;

export const resources: Record<Lang, Translation> = {
  en,
  zh,
};

export interface LangContextValue {
  t: Translation;
  lang: Lang;
  setLang: (l: Lang) => void;
}

export const LangContext = createContext<LangContextValue>({
  t: resources.en,
  lang: "en",
  setLang: () => {},
});