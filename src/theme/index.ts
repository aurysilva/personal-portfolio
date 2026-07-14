import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

export const theme = extendTheme({
  config,
  fonts: {
    heading: `'Segoe UI', system-ui, -apple-system, sans-serif`,
    body: `'Segoe UI', system-ui, -apple-system, sans-serif`,
  },
  colors: {
    brand: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
        _dark: {
          bg: 'gray.900',
          color: 'gray.100',
        },
      },
      '.wp-content': {
        lineHeight: 'tall',
        '& h1, & h2, & h3, & h4': {
          fontWeight: 'semibold',
          mt: 8,
          mb: 4,
        },
        '& p': {
          mb: 4,
        },
        '& a': {
          color: 'brand.600',
          textDecoration: 'underline',
          _dark: {
            color: 'brand.300',
          },
        },
        '& img': {
          maxW: '100%',
          h: 'auto',
          borderRadius: 'md',
          my: 6,
        },
        '& ul, & ol': {
          pl: 6,
          mb: 4,
        },
        '& blockquote': {
          borderLeftWidth: '4px',
          borderLeftColor: 'brand.500',
          pl: 4,
          py: 2,
          my: 6,
          fontStyle: 'italic',
        },
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: 'container.lg',
      },
    },
  },
})
