import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/pages/start.css";
import "./styles/pages/product.css";
import "./styles/components/cards.css";
import "./styles/components/navbar.css";
import "./styles/components/buttons.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
