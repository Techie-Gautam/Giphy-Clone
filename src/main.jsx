import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GifProvider from "./context/Gif-context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GifProvider>
      <App />
    </GifProvider>
  </StrictMode>
);
