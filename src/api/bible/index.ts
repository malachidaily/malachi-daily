// Documentation can be found at https://bolls.life/api/
import { type bibleVersion, selectedBibleVersions } from './static/books';
import { fetchAndCache } from '../index.ts';

const bibleApiOrigin = 'https://bolls.life'

type GetVerses = {
    bookId: number;
    chapter: number;
    verses: number[];
    translations?: readonly string[];
}

export type Verse = {
    pk: number;
    verse: number;
    text: string;
    // Comment is more like here's HTML of related verses.
    comment?: string;
}

type GetVerse = {
    translation: bibleVersion;
    bookId: number;
    chapter: number;
    verse: number;
}

function transformBibleVersesFromMultipleTranslations(data: Array<Array<Verse>>) {
    if (!data || !data.length) {
        throw new Error("Verse does not exist.")
    }

    const returnObj = {} as { [key: bibleVersion]: string }
    for (let versionIndex = 0; versionIndex < data.length; versionIndex += 1) {
        // Collect each verse near its translation (which is the key of the object)
        const currentVersion = selectedBibleVersions[versionIndex];

        // This is a list of verses with the same translation
        for (let verseIndex = 0; verseIndex < data[versionIndex].length ; verseIndex += 1) {
            const hasMultipleVerses = Boolean(verseIndex > 0)
            
            let verseText = data[versionIndex][verseIndex].text
            
            // Oftentimes a verse may have a break because of the title of the section
            // appears first and then the verse content is next. 
            // I decided to just keep both because it's very hard to determine
            // if a break tag is within the verse or just separating a title
            // from a verse.
            if (verseText.includes('<br/>')) {
                // Remove br and everything before
                verseText.replace('<br/>', '\n')
            }

            // Remove anything that looks like HTML syntax in string
            verseText = verseText.replace(/(<([^>]+)>)/ig, ' ')

            if (hasMultipleVerses) {
                returnObj[currentVersion] += verseText;
            } else {
                returnObj[currentVersion] = verseText;
            }
        }
    }
    return returnObj
}

export type BibleVersesFromMultipleTranslations = {
    [key: bibleVersion]: string
}

export async function getBibleVersesFromMultipleTranslations({
    bookId,
    chapter,
    verses,
    translations
} : GetVerses): Promise<BibleVersesFromMultipleTranslations> {
    const data = await fetchAndCache({
        url: `${bibleApiOrigin}/get-paralel-verses/`, 
        cacheKey: `get-paralel-verses-${bookId}-${chapter}-${verses.join('-')}`,
        options: {
            method: "POST",
            cache: 'default',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
                translations: JSON.stringify(translations || selectedBibleVersions),
                verses: JSON.stringify(verses),
                book: bookId,
                chapter
            }),
        }
    })

    if (!data || !data.length) {
        throw new Error("Verse does not exist.")
    }

    // Transform verse to readable data
    const returnObj = transformBibleVersesFromMultipleTranslations(data)
    
    return returnObj
}

// Get the verse using this API https://bolls.life/get-text/<slug:translation>/<int:book>/<int:chapter>/<int:verse>/
export async function getVerse({
    translation = 'NIV',
    bookId,
    chapter,
    verse
} : GetVerse): Promise<Verse> {
    const data = await fetchAndCache({
        url: `${bibleApiOrigin}/get-verse/${translation}/${bookId}/${chapter}/${verse}/`,
        cacheKey: `get-verse-${translation}-${bookId}-${chapter}-${verse}`
    })

    // Remove the title from the scripture.
    // (Usually this happens for the first verse in teh chapter)
    if (data.text.includes('<br/>')) {
        // Remove br and everything before
        data.text = data.text.split('<br/>')[1]
    }

    return data
}