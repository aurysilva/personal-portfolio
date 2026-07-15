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
      '[id]': {
        scrollMarginTop: '5rem',
      },
      '@keyframes marquee': {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' },
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
      '.article-content': {
        fontSize: { base: 'md', md: 'lg' },
        lineHeight: 'tall',
        color: 'gray.300',
        '& > p:first-of-type': {
          fontSize: { base: 'lg', md: 'xl' },
          color: 'gray.200',
          lineHeight: '1.8',
          mb: 8,
        },
        '& h2': {
          fontSize: { base: 'xl', md: '2xl' },
          fontWeight: '700',
          color: 'white',
          mt: 12,
          mb: 4,
          pt: 4,
          borderTopWidth: '1px',
          borderTopColor: 'whiteAlpha.100',
        },
        '& h3': {
          fontSize: { base: 'lg', md: 'xl' },
          fontWeight: '600',
          color: 'white',
          mt: 8,
          mb: 3,
        },
        '& p': {
          mb: 5,
        },
        '& a': {
          color: 'brand.300',
          fontWeight: '500',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
          transition: 'color 0.2s',
          _hover: {
            color: 'brand.200',
          },
        },
        '& strong': {
          color: 'white',
          fontWeight: '600',
        },
        '& ul, & ol': {
          pl: 6,
          mb: 6,
          '& li': {
            mb: 2,
            pl: 1,
          },
          '& li::marker': {
            color: 'brand.400',
          },
        },
        '& img': {
          maxW: '100%',
          h: 'auto',
          borderRadius: 'xl',
          my: 8,
          borderWidth: '1px',
          borderColor: 'whiteAlpha.100',
        },
        '& pre': {
          bg: 'surface.900',
          p: 4,
          borderRadius: 'lg',
          overflowX: 'auto',
          my: 6,
          borderWidth: '1px',
          borderColor: 'whiteAlpha.100',
        },
        '& code': {
          fontFamily: 'mono',
          fontSize: '0.9em',
          bg: 'surface.700',
          px: 1.5,
          py: 0.5,
          borderRadius: 'md',
        },
        '& pre code': {
          bg: 'transparent',
          p: 0,
        },
        '& blockquote': {
          borderLeftWidth: '4px',
          borderLeftColor: 'brand.400',
          bg: 'surface.700',
          pl: 6,
          pr: 4,
          py: 4,
          my: 8,
          borderRadius: '0 lg lg 0',
          fontStyle: 'italic',
          color: 'gray.300',
        },
      },
      '.project-story': {
        fontSize: { base: 'md', md: 'lg' },
        lineHeight: '1.9',
        color: 'gray.400',
        '& p': {
          mb: 6,
        },
        '& a': {
          color: 'brand.300',
          fontWeight: '500',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
          _hover: { color: 'brand.200' },
        },
        '& strong': {
          color: 'white',
          fontWeight: '600',
        },
        '& ul, & ol': {
          pl: 6,
          mb: 6,
          '& li': { mb: 2 },
          '& li::marker': { color: 'brand.400' },
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
