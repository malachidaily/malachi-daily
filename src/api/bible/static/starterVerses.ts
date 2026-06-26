import type { BookName } from "./books";

/**
 * A small, curated on-ramp of well-known verses to memorize. This is a static
 * starter menu, NOT a feed: it removes the cold-start "what do I even memorize?"
 * problem without any backend or ongoing curation. The text itself is fetched
 * from bolls.life when a verse is added, so nothing here needs maintaining.
 *
 * `bookName` MUST match the names in books.ts exactly (e.g. "Psalms", not
 * "Psalm") so the reference and book id resolve correctly.
 */
export type StarterVerse = {
  bookName: BookName;
  chapter: number;
  startVerse: number;
  endVerse?: number;
};

export const starterVerses: StarterVerse[] = [
  { bookName: "John", chapter: 3, startVerse: 16 },
  { bookName: "Philippians", chapter: 4, startVerse: 6, endVerse: 7 },
  { bookName: "Philippians", chapter: 4, startVerse: 13 },
  { bookName: "Proverbs", chapter: 3, startVerse: 5, endVerse: 6 },
  { bookName: "Romans", chapter: 8, startVerse: 28 },
  { bookName: "Romans", chapter: 12, startVerse: 2 },
  { bookName: "Jeremiah", chapter: 29, startVerse: 11 },
  { bookName: "Isaiah", chapter: 41, startVerse: 10 },
  { bookName: "Joshua", chapter: 1, startVerse: 9 },
  { bookName: "Psalms", chapter: 23, startVerse: 1, endVerse: 4 },
  { bookName: "Psalms", chapter: 46, startVerse: 1 },
  { bookName: "Psalms", chapter: 119, startVerse: 105 },
  { bookName: "Matthew", chapter: 6, startVerse: 33 },
  { bookName: "Matthew", chapter: 11, startVerse: 28 },
  { bookName: "Galatians", chapter: 5, startVerse: 22, endVerse: 23 },
  { bookName: "Ephesians", chapter: 2, startVerse: 8, endVerse: 9 },
  { bookName: "2 Timothy", chapter: 1, startVerse: 7 },
  { bookName: "1 Corinthians", chapter: 13, startVerse: 4, endVerse: 7 },
  { bookName: "Romans", chapter: 10, startVerse: 9 },
  { bookName: "Hebrews", chapter: 11, startVerse: 1 },
];

/** Display reference for a starter verse, e.g. "Philippians 4:6-7". */
export function starterRef(v: StarterVerse): string {
  return `${v.bookName} ${v.chapter}:${v.startVerse}${
    v.endVerse && v.endVerse > v.startVerse ? `-${v.endVerse}` : ""
  }`;
}
