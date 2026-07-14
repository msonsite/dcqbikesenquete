/**
 * Vraag 1 — Heeft de klant dcqbikes.be bekeken vóór het bezoek?
 * Kernvraag: meet het bereik van de vernieuwde website. Splitst de flow:
 *  - Ja  -> vraag naar de rol van de website (impact)
 *  - Nee -> vraag via welk kanaal ze ons dan gevonden hebben
 */
export const VISITED_WEBSITE_OPTIONS = [
  { label: "Ja", value: true, icon: "🌐" },
  { label: "Nee", value: false, icon: "✕" },
] as const;

/**
 * Vraag 2a (enkel als de website bekeken werd) — Welke rol speelde ze?
 * Meet de impact van dcqbikes.be op het bezoek/de aankoop.
 */
export const WEBSITE_ROLE_OPTIONS = [
  { label: "Ze overtuigde me om langs te komen", value: "decisive", icon: "🎯" },
  { label: "Ze hielp bij mijn keuze", value: "helped", icon: "👍" },
  { label: "Eigenlijk geen echte rol", value: "no_influence", icon: "🤷" },
] as const;

/**
 * Vraag 2b (enkel als de website NIET bekeken werd) — Hoe vond de klant ons?
 * Kanaalattributie voor bezoekers die niet via de website binnenkwamen.
 */
export const SOURCE_OPTIONS = [
  { label: "Google", icon: "🔍" },
  { label: "Facebook", icon: "📱" },
  { label: "Reviews", icon: "⭐" },
  { label: "Via familie of vrienden", icon: "👥" },
  { label: "In het voorbijrijden", icon: "🚗" },
  { label: "Ik ben hier al klant", icon: "🔄" },
] as const;

export type SourceOption = (typeof SOURCE_OPTIONS)[number]["label"];
export type WebsiteInfluence =
  | (typeof WEBSITE_ROLE_OPTIONS)[number]["value"]
  | "not_visited";

/** Duur van het bedankscherm in milliseconden */
export const THANK_YOU_DURATION_MS = 5000;

/** DCQ Bikes kleuren (afgestemd op dcqbikes.be) */
export const COLORS = {
  red: "#ee2726",
  redDark: "#d41e1d",
  black: "#010101",
  white: "#fffefc",
  gray: "#f9fafb",
  grayBorder: "#e5e7eb",
} as const;
