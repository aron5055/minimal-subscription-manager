import { useLocalStorage } from "@/hooks/useLocalStorage";
import { configureLanguage, detectLanguage, type Lang } from "@/lib/i18n";
import { useEffect, useMemo, type ReactNode } from "react";
import { LangContext, resources } from "./LangContext";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useLocalStorage<Lang>("i18n", detectLanguage);

  useEffect(() => {
    configureLanguage(lang);
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
