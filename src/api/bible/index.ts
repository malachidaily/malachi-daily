// Documentation can be found at https://bolls.life/api/
const bibleApiOrigin = 'https://bolls.life'
const cache: { [key: string]: Verse } = {}

async function fetchAndCache(url: string, options?: RequestInit): Promise<Verse> {
    const cachedResponse: Verse = cache[url]

    if (cachedResponse) {
        console.log('loaded from cache', cachedResponse)
        return cachedResponse;
    } else {
        const response = await fetch(url);
        const data = await response.json()
        cache[url] = data
        return data;
    }
}

type GetVerses = {
    bookId: number;
    chapter: number;
    verses: number[];
    translations?: string[];
}

export type Verse = {
    pk: number;
    verse: number;
    text: string;
    // Comment is more like here's HTML of related verses.
    comment?: string;
}

type GetVerse = {
    translation: 'NIV' | 'ESV' | 'NLT';
    bookId: number;
    chapter: number;
    verse: number;
}

export async function getBibleVersesFromMultipleTranslations({
    bookId,
    chapter,
    verses,
    translations = ['NIV', 'ESV', 'NLT', 'MSG', 'KJV']
} : GetVerses) {
    const data = await fetchAndCache(`${bibleApiOrigin}/get-paralel-verses/`, {
        method: "POST",
        cache: 'default',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            translations,
            verses,
            book: bookId,
            chapter
        }),
    })

    return data
}

// Get the verse using this API https://bolls.life/get-text/<slug:translation>/<int:book>/<int:chapter>/<int:verse>/
export async function getVerse({
    translation = 'NIV',
    bookId,
    chapter,
    verse
} : GetVerse): Promise<Verse> {
    const data = await fetchAndCache(`${bibleApiOrigin}/get-verse/${translation}/${bookId}/${chapter}/${verse}/`)

    // Remove the title from the scripture.
    // (Usually this happens for the first verse in teh chapter)
    if (data.text.includes('<br/>')) {
        // Remove br and everything before
        data.text = data.text.split('<br/>')[1]
    }

    return data
}