import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { App } from "./App";
import { BackendHintsProvider } from "./modules/core/backend-hints";
import { I18nProvider } from "./modules/core/i18n";
import { IsshoLifeProvider } from "./modules/screens/issholife/issholife-context";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <IsshoLifeProvider>
          <BackendHintsProvider>
            <App />
          </BackendHintsProvider>
        </IsshoLifeProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>,
);
