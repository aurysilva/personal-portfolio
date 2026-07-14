import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config,
  fonts: {
    heading: `'Sora', system-ui, sans-serif`,
    body: `'Sora', system-ui, sans-serif`,
    mono: `'JetBrains Mono', monospace`,
  },
  colors: {
    brand: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
    accent: {
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
    },
    surface: {
      900: '#070b14',
      800: '#0f1629',
      700: '#151d32',
      600: '#1c2740',
    },
  },
  styles: {
    global: {
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        bg: 'surface.900',
        color: 'gray.100',
      },
      '::selection': {
        bg: 'brand.500',
        color: 'white',
      },
      '.wp-content': {
        lineHeight: 'tall',
        color: 'gray.300',
        '& h1, & h2, & h3, & h4': {
          fontWeight: 'semibold',
          color: 'white',
          mt: 8,
          mb: 4,
        },
        '& p': {
          mb: 4,
        },
        '& a': {
          color: 'brand.300',
          textDecoration: 'underline',
        },
        '& img': {
          maxW: '100%',
          h: 'auto',
          borderRadius: 'lg',
          my: 6,
        },
        '& ul, & ol': {
          pl: 6,
          mb: 4,
        },
        '& pre, & code': {
          fontFamily: 'mono',
          fontSize: 'sm',
        },
        '& blockquote': {
          borderLeftWidth: '3px',
          borderLeftColor: 'brand.400',
          pl: 4,
          py: 2,
          my: 6,
          color: 'gray.400',
        },
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: 'container.xl',
        px: { base: 4, md: 8 },
      },
    },
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
})

export const sectionPy = { base: 16, md: 24 }
