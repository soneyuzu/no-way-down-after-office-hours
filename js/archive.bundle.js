/**
 * Cast for the orbital archive.
 * Image path: assets/images/{name}.webp (lowercase RGBA cutout).
 * Omit description/note (or leave "") to hide those dossier sections.
 */
const characters = [
  {
    name: "YEFIM",
    role: "CHARACTER",
    age: "—",
    height: "—",
    status: "ACTIVE",
    birthday: "—",
    description: "",
    background: "",
  },
  {
    name: "YUMIN",
    role: "CHARACTER",
    age: "—",
    height: "—",
    status: "ACTIVE",
    birthday: "—",
    description: "",
    background: "",
  },
  {
    name: "ELAT",
    role: "CHARACTER",
    age: "—",
    height: "—",
    status: "ACTIVE",
    birthday: "—",
    description: "",
    background: "",
  },
  {
    name: "EVREN",
    role: "CHARACTER",
    age: "—",
    height: "—",
    status: "ACTIVE",
    birthday: "—",
    description: "",
    background: "",
  },
  {
    name: "ISARN",
    role: "CHARACTER",
    age: "—",
    height: "—",
    status: "ACTIVE",
    birthday: "—",
    description: "",
    background: "",
  },
];

function characterImage(character) {
  return `assets/images/${character.name.toLowerCase()}.webp`;
}


const FRONT_ANGLE = Math.PI / 2;
const TWO_PI = Math.PI * 2;
const PX_TO_RAD = 0.0072;
const COAST_MS = 160;
const MAX_COAST_STEPS = 1.25;
const TAP_SLOP = 8;
const WHEEL_THRESHOLD = 40;

function normalize(angle) {
  while (angle > Math.PI) angle -= TWO_PI;
  while (angle < -Math.PI) angle += TWO_PI;
  return angle;
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function emptyOrbitApi() {
  return {
    rotateTo() {},
    rotatePrevious() {},
    rotateNext() {},
    isDragging: () => false,
  };
}

function createOrbit(stage, characters, hooks = {}) {
  const stand = stage?.querySelector("[data-stand]");
  const cards = [];
  const count = characters?.length ?? 0;
  if (!stage || !stand || count === 0) return emptyOrbitApi();

  const step = TWO_PI / count;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  const rootStyle = getComputedStyle(document.documentElement);
  const tokenPx = (name, fallback) => {
    const value = Number.parseFloat(rootStyle.getPropertyValue(name).trim());
    return Number.isFinite(value) ? value : fallback;
  };
  const nameClearance = tokenPx("--nameplate-clearance", 56);
  const bpPhone = tokenPx("--bp-phone", 600);
  const bpTablet = tokenPx("--bp-tablet", 900);

  let rotation = FRONT_ANGLE;
  let focusIndex = 0;
  let reportedFront = -1;
  let dragging = false;
  let activePointerId = null;
  let pressIndex = null;
  let lastX = 0;
  let lastTime = 0;
  let angularVelocity = 0;
  let dragDistance = 0;
  let hovered = null;
  let interacted = false;
  let animFrame = 0;
  let wheelAcc = 0;
  let resizeFrame = 0;
  let suppressClick = false;

  function activateCard(index) {
    markInteraction();
    if (index === frontIndex()) {
      rotateTo(index);
      hooks.onOpen?.(index);
      return;
    }
    rotateTo(index);
  }

  characters.forEach((character, index) => {
    const el = document.createElement("article");
    el.className = "orbit-card";
    el.dataset.index = String(index);

    const hit = document.createElement("button");
    hit.type = "button";
    hit.className = "card-hit";
    hit.setAttribute("aria-label", character.name);

    const plate = document.createElement("div");
    plate.className = "card-plate";

    const number = document.createElement("span");
    number.className = "card-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const pin = document.createElement("span");
    pin.className = "card-pin";
    pin.setAttribute("aria-hidden", "true");

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const art = document.createElement("div");
    art.className = "card-art";

    const img = document.createElement("img");
    img.src = characterImage(character);
    img.alt = "";
    img.draggable = false;
    img.decoding = "async";
    img.loading = index === 0 ? "eager" : "lazy";
    img.width = 320;
    img.height = 427;

    const name = document.createElement("div");
    name.className = "card-name";
    name.textContent = character.name;

    art.appendChild(img);
    inner.appendChild(art);
    plate.append(number, pin, inner, name);
    hit.appendChild(plate);
    el.appendChild(hit);
    stand.appendChild(el);
    cards.push(el);

    hit.addEventListener("click", (event) => {
      if (suppressClick) {
        suppressClick = false;
        event.preventDefault();
        return;
      }
      activateCard(index);
    });

    el.addEventListener("pointerenter", () => {
      if (!finePointer.matches || dragging) return;
      hovered = index;
      render();
    });
    el.addEventListener("pointerleave", () => {
      if (!finePointer.matches || dragging) return;
      if (hovered === index) hovered = null;
      render();
    });
  });

  function markInteraction() {
    if (interacted) return;
    interacted = true;
    hooks.onFirstInteraction?.();
  }

  function nearestIndexAt(rot) {
    let result = 0;
    let best = Infinity;
    for (let i = 0; i < count; i += 1) {
      const distance = Math.abs(normalize(rot - i * step - FRONT_ANGLE));
      if (distance < best) {
        best = distance;
        result = i;
      }
    }
    return result;
  }

  function frontIndex() {
    return nearestIndexAt(rotation);
  }

  function metrics() {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    const phone = width < bpPhone;
    const tablet = !phone && width < bpTablet;
    const usableH = Math.max(220, height - nameClearance);

    const maxFrontH = phone ? 300 : tablet ? 400 : 470;
    const frontH = Math.min(maxFrontH, usableH * (phone ? 0.68 : 0.72));
    const frontW = frontH * 0.452;
    const backH = frontH * 0.78;
    const backW = frontW * 0.78;

    const orbitX = Math.min(
      phone ? width * 0.36 : tablet ? width * 0.34 : width * 0.3,
      (width - frontW) * 0.5,
      phone ? 120 : tablet ? 220 : 440,
    );
    const orbitY = Math.min(
      frontH * (phone ? 0.15 : 0.13),
      usableH * 0.13,
      phone ? 56 : tablet ? 84 : 120,
    );

    const centerX = width / 2;
    const frontBottomLimit = height - nameClearance;
    const fittedCenterY = frontBottomLimit - orbitY - frontH / 2;
    const balancedCenterY = (height - nameClearance - orbitY) / 2;

    return {
      frontW,
      frontH,
      backW,
      backH,
      orbitX,
      orbitY,
      centerX,
      centerY: Math.min(balancedCenterY, fittedCenterY),
    };
  }

  function render() {
    const m = metrics();
    const front = frontIndex();
    const items = [];

    for (let i = 0; i < count; i += 1) {
      const angle = rotation - i * step;
      const depth = (Math.sin(angle) + 1) * 0.5;
      items.push({
        index: i,
        angle,
        depth,
        x: m.centerX + Math.cos(angle) * m.orbitX,
        y: m.centerY + Math.sin(angle) * m.orbitY,
      });
    }

    items
      .slice()
      .sort((a, b) => a.depth - b.depth)
      .forEach((item, order) => {
        cards[item.index].style.zIndex = String(order + 1);
      });

    for (const item of items) {
      const el = cards[item.index];
      const isFront = item.depth > 0.91;
      const width = isFront ? m.frontW : m.backW;
      const height = isFront ? m.frontH : m.backH;
      const scale = 0.57 + item.depth * 0.43;
      const opacity = 0.48 + item.depth * 0.52;
      const tilt = Math.cos(item.angle) * 0.055;
      const reveal =
        item.index === front || (finePointer.matches && hovered === item.index);

      el.classList.toggle("is-front", item.index === front);
      el.classList.toggle("is-revealed", reveal);
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.opacity = String(opacity);
      el.style.transform = `translate3d(${item.x - width / 2}px, ${item.y - height / 2}px, 0) scale(${scale}) rotate(${tilt}rad)`;
    }

    if (front !== reportedFront) {
      reportedFront = front;
      hooks.onFrontChange?.(front);
    }
  }

  function stopSnap() {
    if (animFrame) cancelAnimationFrame(animFrame);
    animFrame = 0;
  }

  function animateTo(target) {
    if (dragging) return;

    const delta = normalize(target - rotation);
    target = rotation + delta;

    stopSnap();

    if (reducedMotion.matches) {
      rotation = target;
      render();
      return;
    }

    const start = rotation;
    const started = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - started) / 360);
      rotation = start + delta * easeOutCubic(t);
      render();
      if (t < 1) {
        animFrame = requestAnimationFrame(tick);
      } else {
        rotation = target;
        stopSnap();
        render();
      }
    };
    animFrame = requestAnimationFrame(tick);
  }

  function rotateTo(index) {
    focusIndex = ((index % count) + count) % count;
    animateTo(FRONT_ANGLE + focusIndex * step);
  }

  function snapToNearest() {
    rotateTo(nearestIndexAt(rotation));
  }

  function onPointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;
    if (activePointerId !== null) return;

    const card = event.target.closest(".orbit-card");
    pressIndex = card ? Number(card.dataset.index) : null;

    // Avoid scroll-into-view nudges when a card button takes focus on touch.
    const hit = event.target.closest(".card-hit");
    if (hit && typeof hit.focus === "function") {
      hit.focus({ preventScroll: true });
    }

    markInteraction();
    stopSnap();
    wheelAcc = 0;
    dragging = true;
    activePointerId = event.pointerId;
    dragDistance = 0;
    lastX = event.clientX;
    lastTime = performance.now();
    angularVelocity = 0;
    hovered = null;
    stage.setPointerCapture?.(event.pointerId);
  }

  function onPointerMove(event) {
    if (!dragging || event.pointerId !== activePointerId) return;

    const now = performance.now();
    const dx = event.clientX - lastX;
    const dt = Math.max(8, now - lastTime);
    angularVelocity = angularVelocity * 0.7 + ((-dx * PX_TO_RAD) / dt) * 0.3;
    dragDistance += Math.abs(dx);
    lastX = event.clientX;
    lastTime = now;
    rotation -= dx * PX_TO_RAD;
    render();
  }

  function onPointerUp(event) {
    if (!dragging || event.pointerId !== activePointerId) return;
    dragging = false;
    activePointerId = null;
    try {
      stage.releasePointerCapture?.(event.pointerId);
    } catch {
      /* already released */
    }

    if (dragDistance <= TAP_SLOP) {
      if (pressIndex !== null) {
        // Pointer path; a follow-up click may also fire — activateCard is safe to run twice.
        activateCard(pressIndex);
      } else {
        // Interrupted snap / empty-stage tap — settle on nearest card.
        snapToNearest();
      }
      pressIndex = null;
      return;
    }

    pressIndex = null;
    suppressClick = true;
    let coast = angularVelocity * COAST_MS;
    const maxCoast = step * MAX_COAST_STEPS;
    coast = Math.max(-maxCoast, Math.min(maxCoast, coast));
    rotateTo(nearestIndexAt(rotation + coast));
  }

  function onWheel(event) {
    if (dragging) return;
    if (Math.abs(event.deltaY) < 1 && Math.abs(event.deltaX) < 1) return;
    event.preventDefault();
    markInteraction();

    const delta =
      Math.abs(event.deltaY) >= Math.abs(event.deltaX)
        ? event.deltaY
        : event.deltaX;
    wheelAcc += delta;
    if (Math.abs(wheelAcc) < WHEEL_THRESHOLD) return;

    const dir = wheelAcc > 0 ? 1 : -1;
    wheelAcc = 0;
    rotateTo(focusIndex + dir);
  }

  let layoutW = 0;
  let layoutH = 0;

  function onResize() {
    if (resizeFrame) return;
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0;
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      // Ignore tiny mobile-chrome height jitter; remetric on real size/orientation changes.
      if (
        layoutW > 0 &&
        Math.abs(w - layoutW) < 2 &&
        Math.abs(h - layoutH) < 24
      ) {
        return;
      }
      layoutW = w;
      layoutH = h;
      render();
    });
  }

  stage.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
  stage.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("resize", onResize);
  finePointer.addEventListener("change", render);

  render();
  layoutW = stage.clientWidth;
  layoutH = stage.clientHeight;

  return {
    rotateTo,
    rotatePrevious: () => rotateTo(focusIndex - 1),
    rotateNext: () => rotateTo(focusIndex + 1),
    isDragging: () => dragging,
  };
}


function createDossier(root, characters) {
  const panel = root.querySelector("[data-dossier-panel]");
  const closeBtn = root.querySelector("[data-dossier-close]");
  const prevBtn = root.querySelector("[data-dossier-prev]");
  const nextBtn = root.querySelector("[data-dossier-next]");
  const backgroundBtn = root.querySelector("[data-dossier-background-toggle]");
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
    info: panel.querySelector("[data-dossier-info]"),
    backgroundSection: panel.querySelector("[data-dossier-background]"),
    background: panel.querySelector("[data-background]"),
    artFig: panel.querySelector("[data-art-fig]"),
    artNo: panel.querySelector("[data-art-no]"),
    cat: panel.querySelector("[data-cat]"),
    art: panel.querySelector("[data-art]"),
  };

  let openIndex = null;
  let lastFocus = null;
  let backgroundOpen = false;

  const focusables = () =>
    [closeBtn, prevBtn, nextBtn, backgroundBtn].filter((el) => el && !el.disabled);

  function pad(n, width = 2) {
    return String(n).padStart(width, "0");
  }

  function setSection(section, body, value) {
    const text = typeof value === "string" ? value.trim() : "";
    const has = text.length > 0;
    section.hidden = !has;
    body.textContent = has ? text : "";
  }

  function setBackgroundMode(open) {
    backgroundOpen = open;
    if (els.info) els.info.hidden = open;
    if (els.backgroundSection) els.backgroundSection.hidden = !open;
    if (backgroundBtn) {
      backgroundBtn.setAttribute("aria-pressed", String(open));
      backgroundBtn.setAttribute(
        "aria-label",
        open ? "Show character identification" : "Show background lore"
      );
    }
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
    if (els.background) {
      els.background.textContent =
        typeof character.background === "string" && character.background.trim()
          ? character.background.trim()
          : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
          + "Integer vitae justo eget magna fermentum iaculis. "
          + "Praesent commodo cursus magna, vel scelerisque nisl consectetur. "
          + "Donec sed odio dui. Nulla vitae elit libero, a pharetra augue. "
          + "Etiam porta sem malesuada magna mollis euismod.";
    }

    setBackgroundMode(backgroundOpen);

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
    backgroundOpen = false;
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

  function toggleBackground() {
    if (openIndex === null) return;
    setBackgroundMode(!backgroundOpen);
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
  backgroundBtn?.addEventListener("click", toggleBackground);
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

    // On mobile, BACKGROUND uses its own scrollable text element. Treat it
    // like the description so the dialog's scroll guard does not cancel the
    // touch gesture before the lore can scroll.
    const scrollable = event.target.closest?.(
      ".description, .dossier-background p, .dossier-text",
    );
    if (canScroll(scrollable)) return;

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
