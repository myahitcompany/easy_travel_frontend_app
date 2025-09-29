import { createRoot } from "react-dom/client";
import "@/css/tailwind.css";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import { App } from "./App";

createRoot(document.getElementById("esay-travel")!).render(
  <StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>
);
