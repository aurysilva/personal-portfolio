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
import { PostCard } from '@/components/content/PostCard'
import {
  ErrorState,
  LoadingState,
} from '@/components/content/AsyncStateViews'
import { usePosts } from '@/lib/wordpress'
import { sectionPy } from '@/theme'

interface BlogPreviewSectionProps {
  limit?: number
}

export function BlogPreviewSection({ limit = 3 }: BlogPreviewSectionProps) {
  const { data: posts, loading, error } = usePosts({ perPage: limit })

  if (loading) {
    return <LoadingState label="Loading blog posts…" />
  }

  if (error) {
    return (
      <Container>
        <ErrorState message={error.message} />
      </Container>
    )
  }

  return (
    <Box as="section" id="blog" py={sectionPy} bg="surface.800">
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
                05 — Insights
              </Text>
              <Heading size={{ base: 'xl', md: '2xl' }} fontWeight="800" letterSpacing="-0.02em">
                Materials I find interesting
              </Heading>
            </Stack>
            <Button
              as={RouterLink}
              to="/blog"
              variant="outline"
              borderColor="whiteAlpha.300"
              size="lg"
              flexShrink={0}
            >
              All posts →
            </Button>
          </Flex>

          {posts && posts.length > 0 && (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </SimpleGrid>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
