import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ToastProvider } from "./components/ui/toast.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { I18nProvider } from "./contexts/LangContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <ToastProvider>
        <App />
        <Toaster />
      </ToastProvider>
    </I18nProvider>
  </StrictMode>,
);
