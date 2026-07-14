import type {
  FetchOptions,
  WpMenuItem,
  WpPage,
  WpPortfolio,
  WpPost,
  WpSiteInfo,
  WpTerm,
} from './types'
import { WordPressApiError } from './types'

const WORDPRESS_URL = import.meta.env.VITE_WORDPRESS_URL?.replace(/\/$/, '')

const EMBED_PARAMS = '_embed=1'

function getBaseUrl(): string {
  if (!WORDPRESS_URL) {
    throw new WordPressApiError(
      'VITE_WORDPRESS_URL is not configured. Copy .env.example to .env and set your WordPress URL.',
      0,
    )
  }

  return WORDPRESS_URL
}

async function wpFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new WordPressApiError(
      `WordPress request failed: ${response.status} ${response.statusText}`,
      response.status,
    )
  }

  return response.json() as Promise<T>
}

function buildQuery(options: FetchOptions = {}): string {
  const params = new URLSearchParams()

  if (options.page) params.set('page', String(options.page))
  if (options.perPage) params.set('per_page', String(options.perPage))
  if (options.search) params.set('search', options.search)
  if (options.category) params.set('wpb_fp_portfolio_cat', String(options.category))

  const query = params.toString()
  return query ? `&${query}` : ''
}

export function getWordPressUrl(): string | undefined {
  return WORDPRESS_URL
}

export async function fetchSiteInfo(): Promise<WpSiteInfo> {
  return wpFetch<WpSiteInfo>('/wp-json')
}

export async function fetchPages(options: FetchOptions = {}): Promise<WpPage[]> {
  return wpFetch<WpPage[]>(
    `/wp-json/wp/v2/pages?${EMBED_PARAMS}${buildQuery({ perPage: 100, ...options })}`,
  )
}

export async function fetchPageBySlug(slug: string): Promise<WpPage | null> {
  const pages = await wpFetch<WpPage[]>(
    `/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&${EMBED_PARAMS}`,
  )

  return pages[0] ?? null
}

export async function fetchPosts(options: FetchOptions = {}): Promise<WpPost[]> {
  return wpFetch<WpPost[]>(
    `/wp-json/wp/v2/posts?${EMBED_PARAMS}${buildQuery({ perPage: 12, ...options })}`,
  )
}

export async function fetchPostBySlug(slug: string): Promise<WpPost | null> {
  const posts = await wpFetch<WpPost[]>(
    `/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&${EMBED_PARAMS}`,
  )

  return posts[0] ?? null
}

export async function fetchPortfolio(
  options: FetchOptions = {},
): Promise<WpPortfolio[]> {
  return wpFetch<WpPortfolio[]>(
    `/wp-json/wp/v2/wpb_fp_portfolio?${EMBED_PARAMS}${buildQuery({ perPage: 100, ...options })}`,
  )
}

export async function fetchPortfolioBySlug(
  slug: string,
): Promise<WpPortfolio | null> {
  const items = await wpFetch<WpPortfolio[]>(
    `/wp-json/wp/v2/wpb_fp_portfolio?slug=${encodeURIComponent(slug)}&${EMBED_PARAMS}`,
  )

  return items[0] ?? null
}

export async function fetchPortfolioCategories(): Promise<WpTerm[]> {
  return wpFetch<WpTerm[]>(
    '/wp-json/wp/v2/wpb_fp_portfolio_cat?per_page=100&orderby=count&order=desc',
  )
}

export function getPortfolioTerms(item: WpPortfolio): WpTerm[] {
  return item._embedded?.['wp:term']?.flat() ?? []
}

export async function fetchMenu(location = 'primary'): Promise<WpMenuItem[]> {
  try {
    return await wpFetch<WpMenuItem[]>(
      `/wp-json/menus/v1/menus/${encodeURIComponent(location)}`,
    )
  } catch (error) {
    if (error instanceof WordPressApiError && error.status === 404) {
      return []
    }

    throw error
  }
}

export function getFeaturedImageUrl(
  item: WpPage | WpPost | WpPortfolio,
  size: 'full' | 'medium' | 'thumbnail' = 'full',
): string | undefined {
  const media = item._embedded?.['wp:featuredmedia']?.[0]
  if (!media) return undefined

  if (size === 'full') return media.source_url

  const sizes = (media as WpMediaWithSizes).media_details?.sizes
  return sizes?.[size]?.source_url ?? media.source_url
}

interface WpMediaWithSizes {
  source_url: string
  media_details?: {
    sizes?: Record<string, { source_url: string }>
  }
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
}

export function mapMenuUrlToPath(url: string): string {
  if (!WORDPRESS_URL) return url

  try {
    const parsed = new URL(url)
    const base = new URL(WORDPRESS_URL)

    if (parsed.origin !== base.origin) {
      return url
    }

    const path = parsed.pathname.replace(/\/$/, '') || '/'
    return path
  } catch {
    return url
  }
}
