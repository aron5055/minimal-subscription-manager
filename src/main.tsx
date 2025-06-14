import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { CurrencyProvider } from "./contexts/CurrencyContext.tsx";
import { I18nProvider } from "./contexts/LangContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <CurrencyProvider>
        <App />
        <Toaster />
      </CurrencyProvider>
    </I18nProvider>
  </StrictMode>,
);
