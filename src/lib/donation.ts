// Formatting + point helpers shared by /donate and /challenge.
// Tracking/persistence lives in ./tracking.ts.

/** ₹100 = 1 challenge point (applies to donations and sales). */
export const RUPEES_PER_POINT = 100;

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

/** Format a number as challenge lights (moments of kindness). */
export function formatPoints(amount: number): string {
  return `${new Intl.NumberFormat("en-IN").format(amount)} lights`;
}
