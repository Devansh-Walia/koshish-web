// Shared challenge/donation tracking.
//
// When Firebase is configured (PUBLIC_FIREBASE_* env vars), totals live in a
// single Firestore document (`challenge/totals`) and update live on every
// device. Without config (e.g. local dev with no .env), it falls back to
// localStorage so the UI still works — but only on this browser.
//
// Writes are validated server-side by `firestore.rules` (increment-only,
// capped amounts), so the public web config can safely ship to the browser.

import { QR_OPTIONS } from "../data/donateData";

export interface Totals {
  /** Total ₹ donated via the /donate QR codes. */
  donations: number;
  /** Total ₹ of recorded sales. */
  sales: number;
  /** Number of Instagram/YouTube follows. */
  follows: number;
  /** Number of game participants. */
  game: number;
  /** Donation count per QR option, keyed by QrOption.id. */
  emojis: Record<string, number>;
}

/** Hard cap for a single recorded sale (must match firestore.rules). */
export const MAX_SALE = 100000;

const EMPTY: Totals = { donations: 0, sales: 0, follows: 0, game: 0, emojis: {} };

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

/** True when totals are shared across devices via Firestore. */
export const isShared = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId,
);

const emojiField = (id: string) => `emoji_${id}`;

function fromDoc(data: Record<string, unknown> | undefined): Totals {
  const num = (key: string) => {
    const v = data?.[key];
    return typeof v === "number" && Number.isFinite(v) ? v : 0;
  };
  const emojis: Record<string, number> = {};
  for (const option of QR_OPTIONS) emojis[option.id] = num(emojiField(option.id));
  return {
    donations: num("donations"),
    sales: num("sales"),
    follows: num("follows"),
    game: num("game"),
    emojis,
  };
}

// ---------------------------------------------------------------------------
// Firestore backend (loaded lazily so pages that don't track stay light)
// ---------------------------------------------------------------------------

type Fs = typeof import("firebase/firestore");
let fsPromise: Promise<{ fs: Fs; ref: import("firebase/firestore").DocumentReference }> | null =
  null;

function firestore() {
  fsPromise ??= (async () => {
    const [{ initializeApp }, fs] = await Promise.all([
      import("firebase/app"),
      import("firebase/firestore"),
    ]);
    const app = initializeApp(firebaseConfig);
    const db = fs.getFirestore(app);
    return { fs, ref: fs.doc(db, "challenge", "totals") };
  })();
  return fsPromise;
}

async function incrementRemote(fields: Record<string, number>): Promise<void> {
  const { fs, ref } = await firestore();
  const update: Record<string, unknown> = {};
  for (const [key, by] of Object.entries(fields)) update[key] = fs.increment(by);
  await fs.setDoc(ref, update, { merge: true });
}

// ---------------------------------------------------------------------------
// localStorage fallback
// ---------------------------------------------------------------------------

const LOCAL_KEY = "koshish_tracking_totals";
const localListeners = new Set<(t: Totals) => void>();

function readLocal(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function incrementLocal(fields: Record<string, number>): void {
  const data = readLocal();
  for (const [key, by] of Object.entries(fields)) data[key] = (data[key] ?? 0) + by;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  const totals = fromDoc(data);
  localListeners.forEach((cb) => cb(totals));
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Subscribe to live totals. Calls `onChange` immediately-ish and on every
 * update (from any device when shared). Returns an unsubscribe function.
 */
export function subscribeTotals(
  onChange: (totals: Totals) => void,
  onError?: (error: unknown) => void,
): () => void {
  if (!isShared) {
    onChange(fromDoc(readLocal()));
    localListeners.add(onChange);
    return () => localListeners.delete(onChange);
  }

  let unsubscribe: (() => void) | null = null;
  let cancelled = false;
  onChange(EMPTY);
  firestore()
    .then(({ fs, ref }) => {
      if (cancelled) return;
      unsubscribe = fs.onSnapshot(
        ref,
        (snap) => onChange(fromDoc(snap.data())),
        (error) => onError?.(error),
      );
    })
    .catch((error) => onError?.(error));

  return () => {
    cancelled = true;
    unsubscribe?.();
  };
}

function increment(fields: Record<string, number>): Promise<void> {
  if (!isShared) {
    incrementLocal(fields);
    return Promise.resolve();
  }
  return incrementRemote(fields);
}

/** Record a donation made via one of the predefined QR codes. */
export function recordDonation(optionId: string): Promise<void> {
  const option = QR_OPTIONS.find((o) => o.id === optionId);
  if (!option) return Promise.reject(new Error(`Unknown QR option ${optionId}`));
  return increment({ donations: option.amount, [emojiField(option.id)]: 1 });
}

/** Record a sale of `amount` ₹ (rounded, 1..MAX_SALE). */
export function recordSale(amount: number): Promise<void> {
  const rupees = Math.round(amount);
  if (!(rupees >= 1 && rupees <= MAX_SALE)) {
    return Promise.reject(new Error(`Sale must be between ₹1 and ₹${MAX_SALE}`));
  }
  return increment({ sales: rupees });
}

/** Record one Instagram/YouTube follow. */
export function recordFollow(): Promise<void> {
  return increment({ follows: 1 });
}

/** Record one game participant. */
export function recordGameParticipant(): Promise<void> {
  return increment({ game: 1 });
}
