import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { CurrencyProvider } from "./contexts/CurrencyContext.tsx";
import { I18nProvider } from "./contexts/LangContext.tsx";
import { SubsProvider } from "./contexts/SubsContext.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import "./index.css";

// 在开发模式下加载开发工具
if (import.meta.env.DEV) {
  import("./lib/dev");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <ThemeProvider>
        <SubsProvider>
          <CurrencyProvider>
            <App />
            <Toaster />
          </CurrencyProvider>
        </SubsProvider>
      </ThemeProvider>
    </I18nProvider>
  </StrictMode>,
);
