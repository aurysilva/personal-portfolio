/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WORDPRESS_URL: string
  readonly VITE_WORDPRESS_HOME_SLUG?: string
  readonly VITE_CV_URL?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_GA_DEBUG?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.mp4' {
  const src: string
  export default src
}
