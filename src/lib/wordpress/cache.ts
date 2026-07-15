import type { FetchOptions } from './types'

interface CacheEntry {
  data: unknown
  fetchedAt: number
}

const CACHE_TTL_MS = 10 * 60 * 1000
const cache = new Map<string, CacheEntry>()
const inflight = new Map<string, Promise<unknown>>()

export function buildQueryCacheKey(prefix: string, options: FetchOptions = {}): string {
  return `${prefix}:${JSON.stringify({
    page: options.page ?? 1,
    perPage: options.perPage ?? null,
    search: options.search ?? null,
    category: options.category ?? null,
  })}`
}

export function getCachedQuery<T>(key: string): T | null {
  const entry = cache.get(key)
  if (!entry) return null

  if (Date.now() - entry.fetchedAt > CACHE_TTL_MS) {
    cache.delete(key)
    return null
  }

  return entry.data as T
}

export function setCachedQuery<T>(key: string, data: T): void {
  cache.set(key, { data, fetchedAt: Date.now() })
}

export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
): Promise<T> {
  const cached = getCachedQuery<T>(key)
  if (cached) return cached

  const pending = inflight.get(key) as Promise<T> | undefined
  if (pending) return pending

  const request = fetcher()
    .then((data) => {
      setCachedQuery(key, data)
      return data
    })
    .finally(() => {
      inflight.delete(key)
    })

  inflight.set(key, request)
  return request
}

export function prefetchQuery<T>(key: string, fetcher: () => Promise<T>): void {
  if (getCachedQuery<T>(key) || inflight.has(key)) return
  void fetchWithCache(key, fetcher)
}
