// Documentation can be found at https://bolls.life/api/
const bibleApiOrigin = 'https://bolls.life'
const cache: { [key: string]: Verse } = {}

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
    const response = await fetch(`${bibleApiOrigin}/get-paralel-verses/`, {
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
    
    const data = await response.json()

    return data
}

// Get the verse using this API https://bolls.life/get-text/<slug:translation>/<int:book>/<int:chapter>/<int:verse>/
export async function getVerse({
    translation = 'NIV',
    bookId,
    chapter,
    verse
} : GetVerse): Promise<Verse> {
    // Return cache if it exists
    if (cache[`${translation}/${bookId}/${chapter}/${verse}`]) {
        console.log('retrieved Verse from cache')
        return cache[`${translation}/${bookId}/${chapter}/${verse}`]
    }

    const response = await fetch(`${bibleApiOrigin}/get-verse/${translation}/${bookId}/${chapter}/${verse}/`)
    const data = await response.json()

    // Add to cache
    cache[`${translation}/${bookId}/${chapter}/${verse}`] = data

    return data
}