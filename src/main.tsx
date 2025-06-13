import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ToastProvider } from "./components/ui/toast.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { CurrencyProvider } from "./contexts/CurrencyContext.tsx";
import { I18nProvider } from "./contexts/LangContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <CurrencyProvider>
        <ToastProvider>
          <App />
          <Toaster />
        </ToastProvider>
      </CurrencyProvider>
    </I18nProvider>
  </StrictMode>,
);
