import type { ReactNode } from 'react'
import {
  Box,
  Container,
  Grid,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { WpPortfolio } from '@/lib/wordpress'
import { formatDate, getPortfolioTerms } from '@/lib/wordpress'
import type { ProjectQuote } from '@/lib/content'

interface ProjectMetaGridProps {
  item: WpPortfolio
  quote?: ProjectQuote
  links: { live?: string; github?: string; client?: string }
}

export function ProjectMetaGrid({ item, quote, links }: ProjectMetaGridProps) {
  const terms = getPortfolioTerms(item)
  const client = quote?.cite

  return (
    <Box
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderColor="whiteAlpha.100"
      bg="surface.800"
    >
      <Container maxW="container.xl" py={{ base: 8, md: 10 }}>
        <Grid
          templateColumns={{ base: '1fr 1fr', lg: 'repeat(4, 1fr)' }}
          gap={{ base: 6, md: 8 }}
        >
          <MetaCell label="Disciplines">
            <Stack spacing={1}>
              {terms.map((term) => (
                <Text key={term.id} fontSize="sm" color="gray.200">
                  {term.name}
                </Text>
              ))}
            </Stack>
          </MetaCell>

          {client && (
            <MetaCell label="Client">
              <Text fontSize="sm" color="gray.200" fontWeight="medium">
                {client}
              </Text>
            </MetaCell>
          )}

          <MetaCell label="Published">
            <Text fontSize="sm" color="gray.200">
              {formatDate(item.date)}
            </Text>
          </MetaCell>

          <MetaCell label="Project Links">
            <Stack spacing={2}>
              {links.live && (
                <ExternalLink href={links.live} label="Live demo" />
              )}
              {links.github && (
                <ExternalLink href={links.github} label="GitHub" />
              )}
              {links.client && (
                <ExternalLink href={links.client} label="Client website" />
              )}
            </Stack>
          </MetaCell>
        </Grid>
      </Container>
    </Box>
  )
}

function MetaCell({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <Stack spacing={3}>
      <Text
        fontSize="xs"
        fontWeight="semibold"
        textTransform="uppercase"
        letterSpacing="wider"
        color="gray.500"
      >
        {label}
      </Text>
      {children}
    </Stack>
  )
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      isExternal
      fontSize="sm"
      color="brand.300"
      fontWeight="medium"
      display="inline-flex"
      alignItems="center"
      gap={2}
      _hover={{ color: 'brand.200', textDecoration: 'none' }}
    >
      {label}
      <Text as="span" fontSize="xs">
        ↗
      </Text>
    </Link>
  )
}
