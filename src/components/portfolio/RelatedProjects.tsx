import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { PortfolioCard } from '@/components/content/PortfolioCard'
import { LoadingState } from '@/components/content/AsyncStateViews'
import { usePortfolio } from '@/lib/wordpress'

interface RelatedProjectsProps {
  currentSlug: string
  limit?: number
}

export function RelatedProjects({ currentSlug, limit = 3 }: RelatedProjectsProps) {
  const { data: items, loading } = usePortfolio({ perPage: limit + 1 })
  const related = items?.filter((item) => item.slug !== currentSlug).slice(0, limit)

  if (loading) {
    return (
      <Box py={16}>
        <LoadingState label="Loading projects…" />
      </Box>
    )
  }

  if (!related || related.length === 0) return null

  return (
    <Box
      as="section"
      py={{ base: 16, md: 24 }}
      borderTopWidth="1px"
      borderColor="whiteAlpha.100"
    >
      <Container maxW="container.xl">
        <Stack spacing={10}>
          <Stack spacing={2} textAlign="center" maxW="2xl" mx="auto">
            <Text
              fontSize="sm"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
              color="brand.400"
            >
              Explore more
            </Text>
            <Heading size="xl">Related projects</Heading>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {related.map((item) => (
              <PortfolioCard key={item.id} item={item} compact />
            ))}
          </SimpleGrid>

          <Flex justify="center">
            <Button
              as={RouterLink}
              to="/portfolio"
              variant="outline"
              borderColor="whiteAlpha.300"
              size="lg"
            >
              View all projects
            </Button>
          </Flex>
        </Stack>
      </Container>
    </Box>
  )
}
