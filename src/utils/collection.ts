import { books, type BookName } from "../api/bible/static/books";

/**
 * The user's personal memorization collection, stored entirely in
 * localStorage. This replaces the old Baserow-driven "verse of the week"
 * curation: there is no backend and no scheduling. People pick verses, the app
 * remembers them here, and the verse they were last working on is restored on
 * open.
 */

export const STORAGE_KEYS = {
  verses: "malachi:verses",
  activeRef: "malachi:activeRef",
} as const;

/** A single verse (or verse range) the user is memorizing. */
export type VerseEntry = {
  /** Human-readable reference, e.g. "Psalms 103:13" or "1 John 1:9". Identity. */
  ref: string;
  bookId: number;
  bookName: string;
  chapter: number;
  startVerse: number;
  /** 0 when it's a single verse. */
  endVerse: number;
  /** Verse text per translation, cached so the collection works offline. */
  versesObj: Record<string, string>;
  /** Epoch ms the verse was added. */
  addedAt: number;
  /** Epoch ms of the last practice session, or null if never practiced. */
  lastPracticedAt: number | null;
  /** Hardest slider level (0-60) the user has practiced this verse at. */
  bestFidelity?: number;
};

/** How "fresh" a verse is in the user's memory, derived from recency. */
export type Freshness = "new" | "fresh" | "fading" | "stale";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Practiced within this window = fresh. */
const FRESH_WINDOW_MS = 3 * DAY_MS;
/** Practiced within this window = fading. Past it = stale. */
const FADING_WINDOW_MS = 14 * DAY_MS;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage can throw in private mode or when full. Fail quietly:
    // a memorization app losing a save is annoying, not worth crashing over.
  }
}

/** Every saved verse, newest first. */
export function getVerses(): VerseEntry[] {
  const verses = readJSON<VerseEntry[]>(STORAGE_KEYS.verses, []);
  return Array.isArray(verses) ? verses : [];
}

export function saveVerses(verses: VerseEntry[]): void {
  writeJSON(STORAGE_KEYS.verses, verses);
}

/** The ref of the verse the user was last working on (restored on open). */
export function getActiveRef(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(STORAGE_KEYS.activeRef);
}

export function setActiveRef(ref: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEYS.activeRef, ref);
  } catch {
    // See writeJSON.
  }
}

export function getVerse(ref: string): VerseEntry | undefined {
  return getVerses().find((v) => v.ref === ref);
}

/** The verse to load on open, or null on a true cold start. */
export function getActiveVerse(): VerseEntry | null {
  const ref = getActiveRef();
  if (!ref) return null;
  return getVerse(ref) ?? null;
}

/**
 * Add a verse to the collection (or refresh an existing one's cached text).
 * Re-adding a verse preserves its practice history. Returns the new list.
 */
export function upsertVerse(entry: VerseEntry): VerseEntry[] {
  const verses = getVerses();
  const existing = verses.find((v) => v.ref === entry.ref);

  let next: VerseEntry[];
  if (existing) {
    const merged: VerseEntry = {
      ...existing,
      ...entry,
      // Never let a re-add wipe progress.
      addedAt: existing.addedAt,
      lastPracticedAt: existing.lastPracticedAt,
      bestFidelity: existing.bestFidelity,
    };
    next = verses.map((v) => (v.ref === entry.ref ? merged : v));
  } else {
    next = [entry, ...verses];
  }

  saveVerses(next);
  return next;
}

export function removeVerse(ref: string): VerseEntry[] {
  const next = getVerses().filter((v) => v.ref !== ref);
  saveVerses(next);
  if (getActiveRef() === ref) {
    // Fall back to whatever's left, or clear out on an empty collection.
    if (next.length && isBrowser()) {
      setActiveRef(next[0].ref);
    } else if (isBrowser()) {
      localStorage.removeItem(STORAGE_KEYS.activeRef);
    }
  }
  return next;
}

/**
 * Record that the user just practiced a verse. Stamps recency (for decay) and
 * raises bestFidelity to the hardest level they reached (for "understanding").
 */
export function markPracticed(ref: string, fidelity = 0): void {
  const verses = getVerses();
  const next = verses.map((v) => {
    if (v.ref !== ref) return v;
    return {
      ...v,
      lastPracticedAt: Date.now(),
      bestFidelity: Math.max(v.bestFidelity ?? 0, fidelity),
    };
  });
  saveVerses(next);
}

/** Epoch-ms-based freshness bucket. Pure; safe to call in render. */
export function freshness(entry: Pick<VerseEntry, "lastPracticedAt">): Freshness {
  if (!entry.lastPracticedAt) return "new";
  const elapsed = Date.now() - entry.lastPracticedAt;
  if (elapsed <= FRESH_WINDOW_MS) return "fresh";
  if (elapsed <= FADING_WINDOW_MS) return "fading";
  return "stale";
}

/**
 * Parse a reference like "Psalms 103:13", "1 John 1:9", or "John 3:16-17"
 * into its parts. Returns null if it doesn't look like a reference.
 */
export function parseRef(
  ref: string
): { bookName: string; chapter: number; startVerse: number; endVerse: number } | null {
  // Book name (may start with a number, e.g. "1 John") + chapter:verse[-verse].
  const match = ref.trim().match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
  if (!match) return null;
  const [, bookName, chapter, startVerse, endVerse] = match;
  return {
    bookName,
    chapter: Number(chapter),
    startVerse: Number(startVerse),
    endVerse: endVerse ? Number(endVerse) : 0,
  };
}

/** Build a fresh VerseEntry from picker output (text already fetched). */
export function buildEntry(params: {
  bookName: string;
  chapter: number;
  startVerse: number;
  endVerse?: number;
  versesObj: Record<string, string>;
}): VerseEntry {
  const endVerse =
    params.endVerse && params.endVerse > params.startVerse ? params.endVerse : 0;
  const ref = `${params.bookName} ${params.chapter}:${params.startVerse}${
    endVerse ? `-${endVerse}` : ""
  }`;
  const bookId = books[params.bookName as BookName]?.bookid ?? 0;

  return {
    ref,
    bookId,
    bookName: params.bookName,
    chapter: params.chapter,
    startVerse: params.startVerse,
    endVerse,
    versesObj: params.versesObj,
    addedAt: Date.now(),
    lastPracticedAt: null,
  };
}

/**
 * One-time import of the pre-collection "last reviewed verse" (stored under the
 * old offWeek* keys) into the new collection, so existing users don't lose the
 * verse they were on. Idempotent; clears the legacy keys when done.
 */
export function migrateLegacyOffWeekVerse(): void {
  if (!isBrowser()) return;

  const ref = readJSON<string | null>("offWeekScriptureRef", null);
  const versesObj = readJSON<Record<string, string> | null>(
    "offWeekScriptureVersesObj",
    null
  );

  if (ref && versesObj && !getVerse(ref)) {
    const parsed = parseRef(ref);
    const entry: VerseEntry = parsed
      ? { ...buildEntry({ ...parsed, versesObj }), ref }
      : {
          ref,
          bookId: 0,
          bookName: "",
          chapter: 0,
          startVerse: 0,
          endVerse: 0,
          versesObj,
          addedAt: Date.now(),
          lastPracticedAt: null,
        };

    upsertVerse(entry);
    if (!getActiveRef()) setActiveRef(ref);
  }

  try {
    localStorage.removeItem("offWeekScriptureRef");
    localStorage.removeItem("offWeekScriptureVersesObj");
  } catch {
    // ignore
  }
}
