const citationCache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours


export function getFromCache(doi: string) {
    const item = citationCache.get(doi);
    if(!item) return null;

    if(Date.now() - item.timestamp > CACHE_TTL) {
        citationCache.delete(doi);
        return null;
    }

    return item.data;
}

export function writeToCache(doi: string, data: any) {
    citationCache.set(doi, {
        data,
        timestamp: Date.now()
    })
}