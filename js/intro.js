import { characters } from "./data/characters.js";

const ARCHIVE_URL = "archive.html";

export function initIntro(root) {
  let leaving = false;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  const countEl = root.querySelector(".micro-four");
  if (countEl) {
    const n = Array.isArray(characters) ? characters.length : 0;
    countEl.textContent = `01 / ${String(n).padStart(2, "0")}`;
  }

  function leaveDelayMs() {
    if (reduced.matches) return 0;
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--duration-fast")
      .trim();
    const value = Number.parseFloat(raw);
    return Number.isFinite(value) ? value : 220;
  }

  function enter() {
    if (leaving) return;
    leaving = true;
    root.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.href = ARCHIVE_URL;
    }, leaveDelayMs());
  }

  root.addEventListener("click", enter);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      enter();
    }
  });

  // Back/forward cache can restore a mid-leave intro; reset so it stays usable.
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted && !leaving) return;
    leaving = false;
    root.classList.remove("is-leaving");
  });
}
