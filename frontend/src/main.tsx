import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/theme-provider";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
