import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { CurrencyProvider } from "./contexts/CurrencyContext.tsx";
import { I18nProvider } from "./contexts/LangContext.tsx";
import { SubsProvider } from "./contexts/SubsContext.tsx";
import "./index.css";

// 在开发模式下加载开发工具
if (import.meta.env.DEV) {
  import("./lib/dev");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <SubsProvider>
        <CurrencyProvider>
          <App />
          <Toaster />
        </CurrencyProvider>
      </SubsProvider>
    </I18nProvider>
  </StrictMode>,
);
