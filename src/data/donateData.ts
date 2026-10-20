// Data for the /donate page.
//
// Each predefined QR code maps to a fixed amount (₹) and an emoji, matching
// the files placed in public/images/qr/ (e.g. "50 - ☺️.png" → 50.png).
//
// NOTE: ids + amounts are mirrored in /firestore.rules (`emoji_<id>` and the
// donation() checks). If you add or change a QR option, update the rules too.

export interface QrOption {
  id: string;
  /** Donation amount in ₹ for this QR code. */
  amount: number;
  /** Emoji associated with this QR code. */
  emoji: string;
  /** Path to the QR image (relative to /public). */
  image: string;
}

export const QR_OPTIONS: QrOption[] = [
  { id: "50", amount: 50, emoji: "☺️", image: "/images/qr/50.png" },
  { id: "100", amount: 100, emoji: "🥳", image: "/images/qr/100.png" },
  { id: "150", amount: 150, emoji: "💕", image: "/images/qr/150.png" },
  { id: "200", amount: 200, emoji: "✨", image: "/images/qr/200.png" },
  { id: "250", amount: 250, emoji: "😳", image: "/images/qr/250.png" },
  { id: "500", amount: 500, emoji: "🤯", image: "/images/qr/500.png" },
  { id: "1000", amount: 1000, emoji: "🥵", image: "/images/qr/1000.png" },
];

/** Emoji list derived from the QR codes (for the "pick an emoji" UI). */
export const EMOJI_OPTIONS = QR_OPTIONS.map((option) => ({
  emoji: option.emoji,
  amount: option.amount,
}));