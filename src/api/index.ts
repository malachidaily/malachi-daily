const cache: { 
    [key: string]: {
        value: any,
        lastUpdated: number
    }
} = {}
const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

type FetchCache = {
    url: string,
    cacheKey: string,
    options?: RequestInit,
    maxCacheDurationInMilliseconds?: number
}

export async function fetchAndCache({
    url,
    cacheKey,
    options,
    maxCacheDurationInMilliseconds = ONE_DAY_IN_MILLISECONDS
} : FetchCache): Promise<any> {
    const cachedResponse = cache[cacheKey]
    const lastUpdated = cachedResponse?.lastUpdated || Date.now();
    const isCacheExpired = Boolean(lastUpdated && (Date.now() - lastUpdated > maxCacheDurationInMilliseconds))

    // If the data is less than 1 day old, return the data from the cache
    if (cachedResponse && !isCacheExpired) {
        return cachedResponse.value;
    } else {
        const response = await fetch(url, options);
        const data = await response.json()
        cache[cacheKey] = {
            value: data, 
            lastUpdated: Date.now() // Store the last updated time of the data
        }
        return data;
    }
}

export function clearCache(cacheKey?: string): void {
    if (cacheKey) {
        delete cache[cacheKey];
    } else {
        // Clear the entire cache
        Object.keys(cache).forEach((key) => {
            delete cache[key];
        });
    }
}
