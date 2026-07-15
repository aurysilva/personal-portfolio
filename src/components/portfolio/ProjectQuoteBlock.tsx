import { Box, Container, Text } from '@chakra-ui/react'
import type { ProjectQuote } from '@/lib/content'

interface ProjectQuoteBlockProps {
  quote: ProjectQuote
}

export function ProjectQuoteBlock({ quote }: ProjectQuoteBlockProps) {
  return (
    <Box py={{ base: 12, md: 20 }}>
      <Container maxW="container.lg">
        <Box position="relative" px={{ base: 4, md: 12 }}>
          <Text
            position="absolute"
            top={{ base: -4, md: -8 }}
            left={{ base: 0, md: 4 }}
            fontSize={{ base: '6xl', md: '8xl' }}
            fontWeight="800"
            color="whiteAlpha.100"
            lineHeight="1"
            userSelect="none"
            aria-hidden
          >
            &ldquo;
          </Text>
          <Text
            fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
            fontWeight="500"
            lineHeight="1.6"
            color="gray.200"
            fontStyle="italic"
            position="relative"
          >
            {quote.text}
          </Text>
          {quote.cite && (
            <Text
              mt={6}
              fontSize="sm"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
              color="brand.400"
            >
              — {quote.cite}
            </Text>
          )}
        </Box>
      </Container>
    </Box>
  )
}
