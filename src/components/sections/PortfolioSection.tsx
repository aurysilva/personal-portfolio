import { useEffect, useMemo, useState } from 'react'
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
import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import { PortfolioCarousel } from '@/components/portfolio/PortfolioCarousel'
import { PortfolioCard } from '@/components/content/PortfolioCard'
import {
  ErrorState,
  LoadingState,
} from '@/components/content/AsyncStateViews'
import { PaginationBar } from '@/components/ui/PaginationBar'
import {
  usePortfolio,
  usePortfolioCategories,
  usePortfolioPaginated,
  PORTFOLIO_PAGE_SIZE,
  prefetchQuery,
  buildQueryCacheKey,
  fetchPortfolioPaginated,
} from '@/lib/wordpress'
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
  if (showFilters) {
    return <PaginatedPortfolioSection />
  }

  return (
    <PortfolioSectionContent limit={limit} carousel={carousel} showFilters={false} />
  )
}

function PaginatedPortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<number | undefined>()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number.parseInt(searchParams.get('page') ?? '1', 10) || 1)
  const { data: categories } = usePortfolioCategories()
  const { data, loading, error, isValidating } = usePortfolioPaginated({
    page,
    perPage: PORTFOLIO_PAGE_SIZE,
    category: activeCategory,
  })

  const items = data?.items ?? []
  const totalPages = data?.totalPages ?? 1
  const total = data?.total ?? 0

  useEffect(() => {
    if (page >= totalPages) return

    prefetchQuery(
      buildQueryCacheKey('portfolio-paginated', {
        page: page + 1,
        perPage: PORTFOLIO_PAGE_SIZE,
        category: activeCategory,
      }),
      () =>
        fetchPortfolioPaginated({
          page: page + 1,
          perPage: PORTFOLIO_PAGE_SIZE,
          category: activeCategory,
        }),
    )
  }, [page, totalPages, activeCategory])

  const handleCategoryChange = (category: number | undefined) => {
    setActiveCategory(category)
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      next.delete('page')
      return next
    })
  }

  const handlePageChange = (nextPage: number) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      if (nextPage <= 1) {
        next.delete('page')
      } else {
        next.set('page', String(nextPage))
      }
      return next
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading && !data) {
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
          <PortfolioSectionHeader showFilters />

          {categories && categories.length > 0 && (
            <Wrap spacing={2}>
              <WrapItem>
                <FilterChip
                  label="All"
                  active={!activeCategory}
                  onClick={() => handleCategoryChange(undefined)}
                />
              </WrapItem>
              {categories.map((cat) => (
                <WrapItem key={cat.id}>
                  <FilterChip
                    label={cat.name}
                    active={activeCategory === cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                  />
                </WrapItem>
              ))}
            </Wrap>
          )}

          {items.length > 0 ? (
            <Box
              opacity={isValidating ? 0.72 : 1}
              transition="opacity 0.2s ease"
              pointerEvents={isValidating ? 'none' : 'auto'}
            >
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {items.map((item) => (
                  <PortfolioCard key={item.id} item={item} />
                ))}
              </SimpleGrid>
            </Box>
          ) : loading ? (
            <LoadingState label="Loading portfolio…" />
          ) : (
            <Text color="gray.500" textAlign="center" py={8}>
              No projects found in this category.
            </Text>
          )}

          <PaginationBar
            page={Math.min(page, totalPages)}
            totalPages={totalPages}
            total={total}
            perPage={PORTFOLIO_PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        </Stack>
      </Container>
    </Box>
  )
}

function PortfolioSectionContent({
  limit,
  carousel,
  showFilters,
}: {
  limit?: number
  carousel: boolean
  showFilters: boolean
}) {
  const { data: items, loading, error } = usePortfolio()

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
          <PortfolioSectionHeader carousel={carousel} showFilters={showFilters} />

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

function PortfolioSectionHeader({
  carousel = false,
  showFilters = false,
}: {
  carousel?: boolean
  showFilters?: boolean
}) {
  return (
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
        {showFilters && (
          <Text color="gray.500" fontSize="sm">
            {PORTFOLIO_PAGE_SIZE} projects per page
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
