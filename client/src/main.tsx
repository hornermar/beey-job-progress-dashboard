// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Strict mode is disabled for development to avoid closing the WebSocket connection

createRoot(document.getElementById("root")!).render(
  //<StrictMode>
  <App />
  //</StrictMode>
);
