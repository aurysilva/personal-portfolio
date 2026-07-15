import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { PostCard } from '@/components/content/PostCard'
import { LoadingState } from '@/components/content/AsyncStateViews'
import { usePosts } from '@/lib/wordpress'

interface RelatedPostsProps {
  currentSlug: string
  limit?: number
}

export function RelatedPosts({ currentSlug, limit = 3 }: RelatedPostsProps) {
  const { data: posts, loading } = usePosts({ perPage: limit + 1 })

  const related = posts?.filter((p) => p.slug !== currentSlug).slice(0, limit)

  if (loading) {
    return (
      <Box py={12}>
        <LoadingState label="Loading related posts…" />
      </Box>
    )
  }

  if (!related || related.length === 0) return null

  return (
    <Box
      as="section"
      py={{ base: 12, md: 16 }}
      borderTopWidth="1px"
      borderColor="whiteAlpha.100"
      bg="surface.800"
    >
      <Container maxW="container.lg">
        <Stack spacing={8}>
          <Stack spacing={2}>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
              color="brand.400"
            >
              Keep reading
            </Text>
            <Heading size="lg">Related articles</Heading>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {related.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </SimpleGrid>

          <Flex justify="center" pt={4}>
            <Text
              as={RouterLink}
              to="/blog"
              color="brand.300"
              fontWeight="medium"
              _hover={{ color: 'brand.200' }}
            >
              View all posts →
            </Text>
          </Flex>
        </Stack>
      </Container>
    </Box>
  )
}
