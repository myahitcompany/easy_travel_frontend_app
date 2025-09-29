import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/tailwind.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>,
);
