// Shared client-side tracking via cookies.
//
// Totals are persisted in cookies so `/donate` (writes donations) and
// `/challenge` (reads all sources) share the same live figures. This is
// intentionally client-only: cookies are read/written in the browser.

export const DONATION_COOKIE = "koshish_donation_total";
export const SALES_COOKIE = "koshish_sales_total";
export const FOLLOWS_COOKIE = "koshish_follows";
export const GAME_COOKIE = "koshish_game_participants";

/** ₹100 = 1 challenge point (applies to donations and sales). */
export const RUPEES_PER_POINT = 100;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string): void {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

/** Read a numeric cookie (0 if unset/invalid). */
export function getCookieNumber(name: string): number {
  const raw = getCookie(name);
  if (raw === null) return 0;
  const value = parseFloat(raw);
  return Number.isFinite(value) ? value : 0;
}

/** Add `amount` to a numeric cookie and return the new value. */
export function addToCookie(name: string, amount: number): number {
  const next = getCookieNumber(name) + amount;
  setCookie(name, String(next));
  return next;
}

/** Cumulative ₹ donated (written by /donate). */
export function getDonationTotal(): number {
  return getCookieNumber(DONATION_COOKIE);
}

/** Add `amount` (₹) to the donation total and return the new total. */
export function addDonation(amount: number): number {
  return addToCookie(DONATION_COOKIE, amount);
}

/** Convert a ₹ amount into challenge points (₹100 = 1 point, floored). */
export function rupeesToPoints(rupees: number): number {
  return Math.floor(rupees / RUPEES_PER_POINT);
}

/** Format a number as Indian Rupees (no decimals). */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format a number as challenge points. */
export function formatPoints(amount: number): string {
  return `${new Intl.NumberFormat("en-IN").format(amount)} pts`;
}