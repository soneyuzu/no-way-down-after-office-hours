# After Office Hours — Character Archive

Zero-dependency character archive for desktop and mobile browsers.

## Run

```bash
python -m http.server 8080
```

Open `http://localhost:8080` (ES modules need HTTP, not `file://`).

## Flow

Intro → orbital archive → dossier.

- Drag / swipe / wheel / ← → to rotate
- Tap a side card to bring it forward; tap the front card to open
- Esc / outside click / × to close the dossier

## Edit characters

1. Edit [`js/data/characters.js`](js/data/characters.js) — names, roles, stats, description, optional `note`.
2. Drop `assets/images/{name}.webp` (lowercase RGBA cutout, ~640×853).

Idle cards use CSS `brightness(0)` on the WebP alpha — no separate silhouette files.

Stats use `—` until filled. Empty `description` / `note` hides those sections — add bios when ready.

## Assets

| File | Role |
|------|------|
| `assets/fonts/*.woff2` | Calora (display) + Gaibo (body) |
| `assets/images/*.webp` | Character plates (RGBA) |
| `assets/images/introforoc.webp` | Intro poster |
| `assets/images/background.webp` | Archive atmosphere |
| `assets/favicon/favicon.ico` | Browser tab icon |
| `assets/favicon/apple-touch-icon.png` | Home-screen icon |

## Stack

Vanilla HTML / CSS / JS modules. Self-hosted WOFF2 fonts. No npm runtime dependencies.

Breakpoints (CSS media queries + orbit JS via tokens): **600** / **900**.
