export interface WpRenderedContent {
  rendered: string
  protected?: boolean
}

export interface WpMedia {
  id: number
  source_url: string
  alt_text: string
  media_details?: {
    width?: number
    height?: number
  }
}

export interface WpEmbedded {
  'wp:featuredmedia'?: WpMedia[]
  author?: Array<{
    id: number
    name: string
    slug: string
  }>
  'wp:term'?: Array<
    Array<{
      id: number
      name: string
      slug: string
      taxonomy: string
    }>
  >
}

export interface WpPage {
  id: number
  slug: string
  link: string
  title: WpRenderedContent
  content: WpRenderedContent
  excerpt: WpRenderedContent
  date: string
  modified: string
  featured_media: number
  _embedded?: WpEmbedded
}

export interface WpPost extends WpPage {
  categories: number[]
  tags: number[]
}

export interface WpTerm {
  id: number
  name: string
  slug: string
  taxonomy: string
}

export interface WpPortfolio extends WpPage {
  wpb_fp_portfolio_cat: number[]
}

export interface WpMenuItem {
  id: number
  title: { rendered: string }
  url: string
  target: string
  parent: number
  order: number
  object: string
  object_id: number
}

export interface WpSiteInfo {
  name: string
  description: string
  url: string
  home: string
}

export interface FetchOptions {
  page?: number
  perPage?: number
  search?: string
  category?: number
}

export interface PaginatedResult<T> {
  items: T
  total: number
  totalPages: number
}

export class WordPressApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'WordPressApiError'
    this.status = status
  }
}
