import { useCallback, useEffect, useState } from 'react'
import type { Profile } from '@/data/profile'
import type {
  FetchOptions,
  PaginatedResult,
  WpMenuItem,
  WpPage,
  WpPortfolio,
  WpPost,
  WpSiteInfo,
  WpTerm,
} from './types'
import { WordPressApiError } from './types'
import {
  buildQueryCacheKey,
  getCachedQuery,
  setCachedQuery,
} from './cache'
import {
  fetchMenu,
  fetchPageBySlug,
  fetchPages,
  fetchPortfolio,
  fetchPortfolioBySlug,
  fetchPortfolioCategories,
  fetchPortfolioPaginated,
  fetchProfile,
  fetchPostBySlug,
  fetchPosts,
  fetchSiteInfo,
  PORTFOLIO_PAGE_SIZE,
  seedPortfolioPageOneCache,
} from './client'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: WordPressApiError | Error | null
}

const inflightQueries = new Map<string, Promise<unknown>>()

function runQuery<T>(cacheKey: string | undefined, queryFn: () => Promise<T>): Promise<T> {
  if (!cacheKey) return queryFn()

  const pending = inflightQueries.get(cacheKey) as Promise<T> | undefined
  if (pending) return pending

  const request = queryFn()
    .then((data) => {
      setCachedQuery(cacheKey, data)
      return data
    })
    .finally(() => {
      inflightQueries.delete(cacheKey)
    })

  inflightQueries.set(cacheKey, request)
  return request
}

function useWordPressQuery<T>(
  queryFn: () => Promise<T>,
  deps: unknown[] = [],
  cacheKey?: string,
): AsyncState<T> & { refetch: () => void; isValidating: boolean } {
  const [state, setState] = useState<AsyncState<T>>(() => {
    if (cacheKey) {
      const cached = getCachedQuery<T>(cacheKey)
      if (cached) {
        return { data: cached, loading: false, error: null }
      }
    }

    return { data: null, loading: true, error: null }
  })
  const [isValidating, setIsValidating] = useState(false)

  const load = useCallback(() => {
    let cancelled = false
    const cached = cacheKey ? getCachedQuery<T>(cacheKey) : null

    if (cached) {
      setState({ data: cached, loading: false, error: null })
      setIsValidating(true)
    } else {
      setState({ data: null, loading: true, error: null })
      setIsValidating(false)
    }

    const run = () => runQuery(cacheKey, queryFn)

    run()
      .then((data) => {
        if (!cancelled) {
          setState({ data, loading: false, error: null })
          setIsValidating(false)
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState((current) => ({
            data: current.data,
            loading: false,
            error:
              error instanceof Error
                ? error
                : new Error('Unexpected WordPress error'),
          }))
          setIsValidating(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, deps)

  useEffect(() => {
    return load()
  }, [load])

  return { ...state, refetch: load, isValidating }
}

export function useSiteInfo() {
  return useWordPressQuery<WpSiteInfo>(() => fetchSiteInfo(), [])
}

export function usePages(options: FetchOptions = {}) {
  return useWordPressQuery<WpPage[]>(
    () => fetchPages(options),
    [options.page, options.perPage, options.search],
  )
}

export function usePage(slug: string | undefined) {
  return useWordPressQuery<WpPage | null>(
    () => (slug ? fetchPageBySlug(slug) : Promise.resolve(null)),
    [slug],
  )
}

export function usePosts(options: FetchOptions = {}) {
  return useWordPressQuery<WpPost[]>(
    () => fetchPosts(options),
    [options.page, options.perPage, options.search],
  )
}

export function usePost(slug: string | undefined) {
  return useWordPressQuery<WpPost | null>(
    () => (slug ? fetchPostBySlug(slug) : Promise.resolve(null)),
    [slug],
  )
}

export function useMenu(location = 'primary') {
  return useWordPressQuery<WpMenuItem[]>(() => fetchMenu(location), [location])
}

export function usePortfolio(options: FetchOptions = {}) {
  const cacheKey =
    !options.page && !options.category && !options.search
      ? buildQueryCacheKey('portfolio-all', { perPage: 100 })
      : undefined

  return useWordPressQuery<WpPortfolio[]>(
    async () => {
      const items = await fetchPortfolio(options)
      if (!options.category && !options.page && !options.search) {
        seedPortfolioPageOneCache(items)
      }
      return items
    },
    [options.page, options.perPage, options.search, options.category],
    cacheKey,
  )
}

export function usePortfolioPaginated(options: FetchOptions = {}) {
  const cacheKey = buildQueryCacheKey('portfolio-paginated', options)

  return useWordPressQuery<PaginatedResult<WpPortfolio[]>>(
    () => fetchPortfolioPaginated(options),
    [options.page, options.perPage, options.search, options.category],
    cacheKey,
  )
}

export function usePortfolioItem(slug: string | undefined) {
  return useWordPressQuery<WpPortfolio | null>(
    () => (slug ? fetchPortfolioBySlug(slug) : Promise.resolve(null)),
    [slug],
  )
}

export function usePortfolioCategories() {
  return useWordPressQuery<WpTerm[]>(
    () => fetchPortfolioCategories(),
    [],
    buildQueryCacheKey('portfolio-categories', {}),
  )
}

export function useWordPressProfile() {
  return useWordPressQuery<Profile>(
    () => fetchProfile(),
    [],
    buildQueryCacheKey('profile', {}),
  )
}

export { PORTFOLIO_PAGE_SIZE }
