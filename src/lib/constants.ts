/** Bronopties voor vraag 1 */
export const SOURCE_OPTIONS = [
  "Onze website",
  "Google",
  "Facebook / Instagram",
  "Via vrienden of familie",
  "Google Reviews",
  "Ik reed hier voorbij",
  "Ik ben al klant",
  "Andere",
] as const;

/** Redenopties voor optionele vraag 3 */
export const PURCHASE_REASON_OPTIONS = [
  "Persoonlijk advies",
  "Prijs",
  "Service",
  "Aanbod",
  "Website",
  "Ligging",
  "Andere",
] as const;

export type SourceOption = (typeof SOURCE_OPTIONS)[number];
export type PurchaseReasonOption = (typeof PURCHASE_REASON_OPTIONS)[number];

/** Duur van het bedankscherm in milliseconden */
export const THANK_YOU_DURATION_MS = 2000;

/**
 * Optionele vraag 3 in-/uitschakelen via env var.
 * Standaard: uitgeschakeld.
 */
export const SHOW_PURCHASE_REASON =
  process.env.NEXT_PUBLIC_SHOW_PURCHASE_REASON === "true";

/** DCQ Bikes kleuren */
export const COLORS = {
  red: "#E30613",
  redDark: "#B8050F",
  black: "#1A1A1A",
  white: "#FFFFFF",
  gray: "#F5F5F5",
  grayBorder: "#E5E5E5",
} as const;
