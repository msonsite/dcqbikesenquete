/** Wat de klant vandaag naar DCQ Bikes bracht */
export const SOURCE_OPTIONS = [
  { label: "dcqbikes.be", icon: "🌐" },
  { label: "Google / Google Maps", icon: "🔍" },
  { label: "Facebook / Instagram", icon: "📱" },
  { label: "Aanbeveling van iemand", icon: "👥" },
  { label: "Ik kwam hier voorbij", icon: "🚗" },
  { label: "Ik kende DCQ Bikes al", icon: "🔄" },
  { label: "Andere", icon: "💬" },
] as const;

/** De concrete rol van de website in de aankoop */
export const WEBSITE_INFLUENCE_OPTIONS = [
  { label: "Ja, gaf de doorslag", value: "decisive", icon: "🎯" },
  { label: "Ja, hielp bij mijn keuze", value: "helped", icon: "👍" },
  { label: "Bekeken, maar geen invloed", value: "no_influence", icon: "👀" },
  { label: "Niet bekeken", value: "not_visited", icon: "—" },
] as const;

export type SourceOption = (typeof SOURCE_OPTIONS)[number]["label"];
export type WebsiteInfluence =
  (typeof WEBSITE_INFLUENCE_OPTIONS)[number]["value"];

/** Duur van het bedankscherm in milliseconden */
export const THANK_YOU_DURATION_MS = 2000;

/** DCQ Bikes kleuren (afgestemd op dcqbikes.be) */
export const COLORS = {
  red: "#ee2726",
  redDark: "#d41e1d",
  black: "#010101",
  white: "#fffefc",
  gray: "#f9fafb",
  grayBorder: "#e5e7eb",
} as const;
