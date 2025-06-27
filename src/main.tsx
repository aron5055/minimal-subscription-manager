import { CurrencyProvider } from "@/contexts/currency";
import { FilterProvider } from "@/contexts/filter";
import { I18nProvider } from "@/contexts/lang";
import { SortProvider } from "@/contexts/sort";
import { SubsProvider } from "@/contexts/subscription";
import { ThemeProvider } from "@/contexts/theme";
import { Analytics } from "@vercel/analytics/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";

// 在开发模式下加载开发工具
if (import.meta.env.DEV) {
  await import("./lib/dev");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <ThemeProvider>
        <SubsProvider>
          <CurrencyProvider>
            <SortProvider>
              <FilterProvider>
                <App />
                <Toaster position="top-center" richColors />
                <Analytics />
              </FilterProvider>
            </SortProvider>
          </CurrencyProvider>
        </SubsProvider>
      </ThemeProvider>
    </I18nProvider>
  </StrictMode>,
);
