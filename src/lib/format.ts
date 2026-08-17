import { CURRENCY } from "./constants";

/**
 * Formats an amount in FCFA with thin non-breaking space separator and no decimals
 * Example: 250000 -> "250 000 FCFA"
 */
export function formatFCFA(amount: number): string {
  const rounded = Math.round(amount);
  const formattedNumber = new Intl.NumberFormat("fr-FR", {
    useGrouping: true,
    maximumFractionDigits: 0,
  }).format(rounded);

  return `${formattedNumber} ${CURRENCY}`;
}

/**
 * Formats a raw number for KPI display (compact or full)
 * Example: 14850000 -> "14 850 000"
 */
export function formatNumberFr(amount: number): string {
  const rounded = Math.round(amount);
  return new Intl.NumberFormat("fr-FR", {
    useGrouping: true,
    maximumFractionDigits: 0,
  }).format(rounded);
}

/**
 * Formats a Date or ISO date string to DD/MM/YYYY
 * Example: "2026-03-24" -> "24/03/2026"
 */
export function formatDateFr(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "-";
  
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  
  return `${day}/${month}/${year}`;
}

/**
 * Formats a Date to a human friendly French format
 * Example: "2026-03-24" -> "24 Mars 2026"
 */
export function formatDateFullFr(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "-";
  
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
