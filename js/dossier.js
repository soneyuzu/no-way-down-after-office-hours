import { characterImage } from "./data/characters.js";

export function createDossier(root, characters) {
  const panel = root.querySelector("[data-dossier-panel]");
  const closeBtn = root.querySelector("[data-dossier-close]");
  const prevBtn = root.querySelector("[data-dossier-prev]");
  const nextBtn = root.querySelector("[data-dossier-next]");
  const live = root.querySelector("[data-dossier-live]");
  const archiveRoot = document.querySelector(".archive");

  const els = {
    file: panel.querySelector("[data-file]"),
    number: panel.querySelector("[data-dossier-number]"),
    name: panel.querySelector("[data-name]"),
    role: panel.querySelector("[data-role]"),
    age: panel.querySelector("[data-age]"),
    height: panel.querySelector("[data-height]"),
    status: panel.querySelector("[data-status]"),
    birthday: panel.querySelector("[data-birthday]"),
    descriptionSection: panel.querySelector("[data-description-section]"),
    description: panel.querySelector("[data-description]"),
    noteSection: panel.querySelector("[data-note-section]"),
    note: panel.querySelector("[data-note]"),
    artFig: panel.querySelector("[data-art-fig]"),
    artNo: panel.querySelector("[data-art-no]"),
    cat: panel.querySelector("[data-cat]"),
    art: panel.querySelector("[data-art]"),
  };

  let openIndex = null;
  let lastFocus = null;

  const focusables = () =>
    [closeBtn, prevBtn, nextBtn].filter((el) => el && !el.disabled);

  function pad(n, width = 2) {
    return String(n).padStart(width, "0");
  }

  function setSection(section, body, value) {
    const text = typeof value === "string" ? value.trim() : "";
    const has = text.length > 0;
    section.hidden = !has;
    body.textContent = has ? text : "";
  }

  function render(index, { announceChange = false } = {}) {
    const character = characters[index];
    if (!character) return;

    const n2 = pad(index + 1);
    els.file.textContent = `FILE ${pad(index + 1, 3)}`;
    els.number.textContent = n2;
    els.name.textContent = character.name;
    els.role.textContent = character.role || "CHARACTER";
    els.age.textContent = character.age || "—";
    els.height.textContent = character.height || "—";
    els.status.textContent = character.status || "ACTIVE";
    els.birthday.textContent = character.birthday || "—";
    els.artFig.textContent = `FIG. ${n2}`;
    els.artNo.textContent = n2;
    els.cat.textContent = `CAT. ${n2} · ARCHIVE INDEX`;
    els.art.src = characterImage(character);
    els.art.alt = character.name;

    setSection(els.descriptionSection, els.description, character.description);
    setSection(els.noteSection, els.note, character.note);

    root.setAttribute("aria-label", `${character.name} dossier`);
    if (announceChange && live) {
      live.textContent = `${character.name}, file ${pad(index + 1, 3)}`;
    }
  }

  function setBackgroundInert(inert) {
    if (!archiveRoot) return;
    if (inert) archiveRoot.setAttribute("inert", "");
    else archiveRoot.removeAttribute("inert");
  }

  function open(index) {
    const n = characters.length;
    if (n === 0) return;
    const next = ((index % n) + n) % n;

    if (openIndex !== null) {
      openIndex = next;
      render(openIndex, { announceChange: true });
      return;
    }

    openIndex = next;
    lastFocus = document.activeElement;
    // Dialog aria-label carries the name on first open; live region is for swaps.
    render(openIndex, { announceChange: false });
    root.classList.add("is-open");
    root.removeAttribute("aria-hidden");
    setBackgroundInert(true);
    closeBtn.focus({ preventScroll: true });
  }

  function close() {
    if (openIndex === null) return;
    openIndex = null;
    root.classList.remove("is-open");
    root.setAttribute("aria-hidden", "true");
    root.setAttribute("aria-label", "Character dossier");
    if (live) live.textContent = "";
    setBackgroundInert(false);
    if (lastFocus?.focus) lastFocus.focus({ preventScroll: true });
    lastFocus = null;
  }

  function showPrevious() {
    if (openIndex === null || characters.length === 0) return;
    openIndex = (openIndex - 1 + characters.length) % characters.length;
    render(openIndex, { announceChange: true });
  }

  function showNext() {
    if (openIndex === null || characters.length === 0) return;
    openIndex = (openIndex + 1) % characters.length;
    render(openIndex, { announceChange: true });
  }

  function canScroll(el) {
    return Boolean(el && el.scrollHeight > el.clientHeight + 1);
  }

  root.addEventListener("click", (event) => {
    if (event.target === root) close();
  });
  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", showPrevious);
  nextBtn.addEventListener("click", showNext);
  panel.addEventListener("click", (event) => event.stopPropagation());

  root.addEventListener("keydown", (event) => {
    if (!root.classList.contains("is-open") || event.key !== "Tab") return;
    const items = focusables();
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const blockScroll = (event) => {
    if (!root.classList.contains("is-open")) return;
    const desc = event.target.closest?.(".description");
    if (canScroll(desc)) return;
    const column = event.target.closest?.(".dossier-text");
    if (canScroll(column)) return;
    event.preventDefault();
  };
  root.addEventListener("wheel", blockScroll, { passive: false });
  root.addEventListener("touchmove", blockScroll, { passive: false });

  return {
    open,
    close,
    showPrevious,
    showNext,
    isOpen: () => openIndex !== null,
  };
}
