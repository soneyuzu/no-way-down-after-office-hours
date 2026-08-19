/**
 * Cast for the orbital archive.
 * Image path: assets/images/{name}.webp (lowercase RGBA cutout).
 * Omit description/note (or leave "") to hide those dossier sections.
 */
export const characters = [
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

export function characterImage(character) {
  return `assets/images/${character.name.toLowerCase()}.webp`;
}
