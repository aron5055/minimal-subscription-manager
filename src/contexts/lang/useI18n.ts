import { useContext } from "react";
import { LangContext } from "./LangContext";

export function useI18n() {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}