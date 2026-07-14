/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WORDPRESS_URL: string
  readonly VITE_HOME_PAGE_SLUG?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
