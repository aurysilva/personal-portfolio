import { useCallback, useEffect, useState } from 'react'
import type {
  FetchOptions,
  WpMenuItem,
  WpPage,
  WpPost,
  WpSiteInfo,
} from './types'
import { WordPressApiError } from './types'
import {
  fetchMenu,
  fetchPageBySlug,
  fetchPages,
  fetchPostBySlug,
  fetchPosts,
  fetchSiteInfo,
} from './client'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: WordPressApiError | Error | null
}

function useWordPressQuery<T>(
  queryFn: () => Promise<T>,
  deps: unknown[] = [],
): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  const load = useCallback(() => {
    let cancelled = false

    setState((current) => ({ ...current, loading: true, error: null }))

    queryFn()
      .then((data) => {
        if (!cancelled) {
          setState({ data, loading: false, error: null })
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error:
              error instanceof Error
                ? error
                : new Error('Unexpected WordPress error'),
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, deps)

  useEffect(() => {
    return load()
  }, [load])

  return { ...state, refetch: load }
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
