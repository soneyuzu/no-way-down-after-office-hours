import { characters } from "./data/characters.js";
import { createOrbit } from "./orbit.js";
import { createDossier } from "./dossier.js";

const stage = document.querySelector("[data-stand-stage]");
const footerIndex = document.querySelector("[data-footer-index]");
const hint = document.querySelector("[data-hint]");
const dossierHint = document.querySelector("[data-dossier-hint]");
const cast = Array.isArray(characters) ? characters : [];
const coarsePointer = window.matchMedia("(pointer: coarse)");

function syncHints() {
  const touch = coarsePointer.matches;
  if (hint) {
    hint.textContent = touch
      ? "SWIPE TO ROTATE · TAP TO OPEN"
      : "DRAG / SWIPE TO ROTATE · CLICK TO OPEN";
  }
  if (dossierHint) {
    dossierHint.textContent = touch
      ? "TAP OUTSIDE TO CLOSE · ESC TO CLOSE"
      : "CLICK OUTSIDE TO CLOSE · ESC TO CLOSE";
  }
}

syncHints();
coarsePointer.addEventListener?.("change", syncHints);

const dossier = createDossier(
  document.querySelector("[data-dossier]"),
  cast,
);

const orbit = createOrbit(stage, cast, {
  onOpen: (index) => dossier.open(index),
  onFirstInteraction: () => hint?.classList.add("is-hidden"),
  onFrontChange: (index) => {
    if (!footerIndex || cast.length === 0) return;
    footerIndex.textContent = `${String(index + 1).padStart(2, "0")} / ${String(cast.length).padStart(2, "0")}`;
  },
});

if (cast.length === 0 && footerIndex) {
  footerIndex.textContent = "00 / 00";
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (dossier.isOpen()) {
      event.preventDefault();
      dossier.close();
    }
    return;
  }

  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  event.preventDefault();

  if (dossier.isOpen()) {
    if (event.key === "ArrowLeft") dossier.showPrevious();
    else dossier.showNext();
    return;
  }

  if (cast.length === 0) return;

  // Ignore orbit keys while a drag is in progress (focusIndex would desync).
  if (orbit.isDragging()) return;

  if (event.key === "ArrowLeft") orbit.rotatePrevious();
  else orbit.rotateNext();
});
