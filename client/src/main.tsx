import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Guard: if served from any *.manus.space subdomain, redirect immediately to
// padelfit.coach before React renders. This prevents affiliate links from
// being attributed to an unregistered domain.
// padelfit.coach and www.padelfit.coach are explicitly excluded.
if (
  typeof window !== "undefined" &&
  window.location.hostname.endsWith(".manus.space")
) {
  window.location.replace(
    "https://padelfit.coach" +
      window.location.pathname +
      window.location.search
  );
} else {
  createRoot(document.getElementById("root")!).render(<App />);
}
