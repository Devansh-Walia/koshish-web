// Data for the /challenge page — DIT University points dashboard.

export const CHALLENGE = {
  university: "DIT University",
  /** Overall goal for the challenge, in points. */
  goal: 5000,
  /**
   * Deadline for the challenge (ISO string). The mock says "complete in
   * 2 days" — update this to the real end date/time.
   */
  deadline: "2026-10-21T23:59:59",
  tagline:
    "Earn points for DIT University — every action counts towards the goal.",
};

/**
 * The four ways to earn points (from the mock):
 * 1. Sale recording  — ₹100 = 1 point
 * 2. Insta/YT follow — +1 point each
 * 3. Game participation — 1 person = 1 point
 * 4. Donation — ₹100 = 1 point (auto from cookie)
 */
export const POINT_SOURCES = [
  {
    id: "sales",
    title: "Record a sale",
    emoji: "🧾",
    description: "Enter the sale amount — every ₹100 adds 1 point.",
    kind: "sales" as const,
  },
  {
    id: "follows",
    title: "Follow us",
    emoji: "📣",
    description: "Follow on Instagram & YouTube — +1 point each.",
    kind: "follows" as const,
  },
  {
    id: "game",
    title: "Game participation",
    emoji: "🎮",
    description: "Each participant adds 1 point.",
    kind: "game" as const,
  },
  {
    id: "donation",
    title: "Donation",
    emoji: "💝",
    description: "₹100 = 1 point, pulled automatically from donations.",
    kind: "donation" as const,
  },
] as const;