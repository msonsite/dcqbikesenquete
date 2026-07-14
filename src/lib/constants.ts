/**
 * Vraag 1 — Nieuwe of bestaande klant?
 * Segmenteert alle andere data: website-impact telt vooral voor nieuwe klanten.
 */
export const CUSTOMER_TYPE_OPTIONS = [
  { label: "Eerste keer hier", value: "new", icon: "✨" },
  { label: "Ik was hier al eens", value: "returning", icon: "🔄" },
] as const;

/**
 * Vraag 2 (enkel nieuwe klanten) — Hoe heeft u ons leren kennen?
 * Kanaalattributie: welk marketingkanaal brengt nieuwe klanten binnen.
 */
export const SOURCE_OPTIONS = [
  { label: "Onze website", icon: "🌐" },
  { label: "Google", icon: "🔍" },
  { label: "Facebook / Instagram", icon: "📱" },
  { label: "Reviews", icon: "⭐" },
  { label: "Via familie of vrienden", icon: "👥" },
  { label: "In het voorbijrijden", icon: "🚗" },
] as const;

/**
 * Vraag 3 — Rol van de vernieuwde website bij dit bezoek/aankoop.
 * Meet zowel bereik (bekeken ja/nee) als impact (doorslag/hulp).
 */
export const WEBSITE_INFLUENCE_OPTIONS = [
  { label: "Ja, daarom kwam ik langs", value: "decisive", icon: "🎯" },
  { label: "Ja, ik vond er nuttige info", value: "helped", icon: "👍" },
  { label: "Even bekeken, verder niet", value: "no_influence", icon: "👀" },
  { label: "Niet bekeken", value: "not_visited", icon: "✕" },
] as const;

export type CustomerType = (typeof CUSTOMER_TYPE_OPTIONS)[number]["value"];
export type SourceOption = (typeof SOURCE_OPTIONS)[number]["label"];
export type WebsiteInfluence =
  (typeof WEBSITE_INFLUENCE_OPTIONS)[number]["value"];

/** Duur van het bedankscherm in milliseconden */
export const THANK_YOU_DURATION_MS = 6000;

/** DCQ Bikes kleuren (afgestemd op dcqbikes.be) */
export const COLORS = {
  red: "#ee2726",
  redDark: "#d41e1d",
  black: "#010101",
  white: "#fffefc",
  gray: "#f9fafb",
  grayBorder: "#e5e7eb",
} as const;
