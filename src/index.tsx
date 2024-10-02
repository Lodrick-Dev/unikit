import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextDynmacProvider } from "./context/ContextDynamic";
import "animate.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ContextDynmacProvider>
      <App />
    </ContextDynmacProvider>
  </React.StrictMode>
);
