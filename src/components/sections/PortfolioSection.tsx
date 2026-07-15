import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { PortfolioCarousel } from '@/components/portfolio/PortfolioCarousel'
import { PortfolioCard } from '@/components/content/PortfolioCard'
import {
  ErrorState,
  LoadingState,
} from '@/components/content/AsyncStateViews'
import { usePortfolio, usePortfolioCategories } from '@/lib/wordpress'
import { sectionPy } from '@/theme'

interface PortfolioSectionProps {
  limit?: number
  showFilters?: boolean
  carousel?: boolean
}

export function PortfolioSection({
  limit,
  showFilters = false,
  carousel = false,
}: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<number | undefined>()
  const { data: categories } = usePortfolioCategories()
  const { data: items, loading, error } = usePortfolio({
    category: activeCategory,
  })

  const visibleItems = useMemo(() => {
    if (!items) return []
    if (carousel) return items.slice(0, 15)
    return limit ? items.slice(0, limit) : items
  }, [items, limit, carousel])

  if (loading) {
    return <LoadingState label="Loading portfolio…" />
  }

  if (error) {
    return (
      <Container>
        <ErrorState message={error.message} />
      </Container>
    )
  }

  return (
    <Box as="section" id="portfolio" py={sectionPy}>
      <Container maxW="container.xl">
        <Stack spacing={{ base: 10, md: 14 }}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'flex-start', md: 'flex-end' }}
            gap={6}
          >
            <Stack spacing={4} maxW="2xl">
              <Text
                fontSize="sm"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider"
                color="brand.400"
              >
                03 — Selected Work
              </Text>
              <Heading
                size={{ base: 'xl', md: '2xl' }}
                fontWeight="800"
                letterSpacing="-0.02em"
                lineHeight="shorter"
              >
                Projects I created &amp; collaborated on
              </Heading>
              {carousel && (
                <Text color="gray.500" fontSize="sm">
                  Showing 3 at a time — slides one project at a time (up to 15 items)
                </Text>
              )}
            </Stack>
            <Button
              as={RouterLink}
              to="/portfolio"
              variant="outline"
              borderColor="whiteAlpha.300"
              size="lg"
              flexShrink={0}
              display={showFilters ? 'none' : undefined}
            >
              View all →
            </Button>
          </Flex>

          {showFilters && categories && categories.length > 0 && (
            <Wrap spacing={2}>
              <WrapItem>
                <FilterChip label="All" active={!activeCategory} onClick={() => setActiveCategory(undefined)} />
              </WrapItem>
              {categories.map((cat) => (
                <WrapItem key={cat.id}>
                  <FilterChip
                    label={cat.name}
                    active={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                  />
                </WrapItem>
              ))}
            </Wrap>
          )}

          {carousel ? (
            <PortfolioCarousel items={visibleItems} />
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {visibleItems.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <Button
      size="sm"
      variant={active ? 'solid' : 'outline'}
      colorScheme={active ? 'brand' : 'gray'}
      borderColor="whiteAlpha.200"
      onClick={onClick}
      borderRadius="full"
    >
      {label}
    </Button>
  )
}
