import en from "@/assets/i18n/en.json";
import jp from "@/assets/i18n/jp.json";
import zh from "@/assets/i18n/zh.json";
import { type Lang } from "@/lib/i18n";
import { createContext } from "react";

export type Translation = typeof en;

export const resources: Record<Lang, Translation> = {
  en,
  zh,
  jp,
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
