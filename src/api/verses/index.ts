import { fetchAndCache } from "../index.ts";

const BASEROW_AUTH_TOKEN = `Token ${import.meta.env.BASEROW_TOKEN}`;
const VERSES_TABLE_ID = 222976;
const GET_VERSES_ENDPOINT = `https://api.baserow.io/api/database/rows/table/${VERSES_TABLE_ID}/?user_field_names=true`;

export const verseTableHeaders = {
  startDate: 'Start Date',
  adminNotes: 'Admin Notes',
  book: 'Book',
  chapter: 'Chapter',
  verseNumberStart: 'Verse Number Start',
  verseNumberEnd: 'Verse Number End',
  pastStartDate: 'Past Start Date',
  passageNumber: 'Passage Num',
  previewVerse: 'Preview Verse',
  readableVerseRef: 'Verse Ref'
}

export async function getAllVerses({
  pageNum = 1,
  size = 100,
  search = '',
  orderBy = '',
  filters = ''
} = {}) {
  let constructedEndpoint = new URL(GET_VERSES_ENDPOINT);

  constructedEndpoint.searchParams.append("page", String(pageNum));
  constructedEndpoint.searchParams.append("size", String(size));
  
  if (search) {
    constructedEndpoint.searchParams.append("search", String(search));
  }
  if (orderBy) {
    constructedEndpoint.searchParams.append("order_by", String(orderBy));
  }
  if (filters) {
    constructedEndpoint.searchParams.append("filters", String(filters));
  }

  const data = await fetchAndCache({
    url: constructedEndpoint.toString(), 
    cacheKey: `get-verses-${filters}-${size}`,
    options: {
      method: "GET",
      headers: {
        'Authorization': BASEROW_AUTH_TOKEN
      }
    }
  });

  return data;
}
