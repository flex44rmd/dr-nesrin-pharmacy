import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { SiteDataProvider } from "./lib/SiteDataContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SiteDataProvider>
      <App />
    </SiteDataProvider>
  </StrictMode>
);
