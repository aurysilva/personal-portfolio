import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Stack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { PortfolioCard } from '@/components/content/PortfolioCard'
import {
  ErrorState,
  LoadingState,
} from '@/components/content/AsyncStateViews'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { usePortfolio, usePortfolioCategories } from '@/lib/wordpress'
import { sectionPy } from '@/theme'

interface PortfolioSectionProps {
  limit?: number
  showFilters?: boolean
}

export function PortfolioSection({
  limit,
  showFilters = false,
}: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<number | undefined>()
  const { data: categories } = usePortfolioCategories()
  const { data: items, loading, error } = usePortfolio({
    category: activeCategory,
  })

  const visibleItems = useMemo(() => {
    if (!items) return []
    return limit ? items.slice(0, limit) : items
  }, [items, limit])

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
      <Container>
        <Stack spacing={10}>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'flex-start', md: 'flex-end' }}
            spacing={6}
          >
            <SectionHeading
              eyebrow="What have I been doing?"
              title="Projects I created and collaborated on"
              description="Selected work from React apps, email development, landing pages, and CMS builds."
            />
            {limit && (
              <Button
                as={RouterLink}
                to="/portfolio"
                variant="outline"
                borderColor="whiteAlpha.300"
                flexShrink={0}
              >
                View all projects
              </Button>
            )}
          </Stack>

          {showFilters && categories && categories.length > 0 && (
            <Wrap spacing={2}>
              <WrapItem>
                <FilterChip
                  label="All"
                  active={!activeCategory}
                  onClick={() => setActiveCategory(undefined)}
                />
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

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {visibleItems.map((item) => (
              <PortfolioCard key={item.id} item={item} compact={!!limit} />
            ))}
          </SimpleGrid>
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
