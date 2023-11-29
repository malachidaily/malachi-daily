import type { APIRoute } from "astro";
import { selectedBibleVersions } from '../../api/bible/static/books';
import { getBibleVersesFromMultipleTranslations } from '../../api/bible';

export const GET: APIRoute = async ({ url }) => {
    // Get query params for getBibleVersesFromMultipleTranslations from Astro.url.searchParams
    const { bookId, chapter, verses } = Object.fromEntries(url.searchParams);
    const bibleVerses = await getBibleVersesFromMultipleTranslations({
        bookId: Number(bookId),
        chapter: Number(chapter),
        verses: verses.split(',').map(Number),
        translations: selectedBibleVersions
    });

    if (!bibleVerses) {
        return new Response(
            JSON.stringify({ error: "Verse does not exist." }),
            {
                // 204 = The request was successful, but there is no content to be returned.
                status: 204,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    return new Response(
        JSON.stringify(bibleVerses),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}
