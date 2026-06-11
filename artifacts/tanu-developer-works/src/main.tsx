import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Apply saved theme before render to prevent flash
try {
  const saved = localStorage.getItem("tdw-theme");
  const isDark = saved ? saved === "dark" : true;
  if (isDark) document.documentElement.classList.add("dark");
} catch {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(<App />);
