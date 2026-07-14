import { Container, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { PageMeta } from '@/components/seo/PageMeta'
import { PostCard } from '@/components/content/PostCard'
import {
  ErrorState,
  LoadingState,
} from '@/components/content/AsyncStateViews'
import { usePosts, useSiteInfo } from '@/lib/wordpress'

export function BlogPage() {
  const { data: siteInfo } = useSiteInfo()
  const { data: posts, loading, error } = usePosts()

  if (loading) {
    return <LoadingState label="Loading posts…" />
  }

  if (error) {
    return (
      <Container>
        <ErrorState message={error.message} />
      </Container>
    )
  }

  return (
    <Container>
      <PageMeta
        title={`Blog | ${siteInfo?.name ?? 'Portfolio'}`}
        description="Latest posts from WordPress"
      />
      <Stack spacing={10}>
        <Stack spacing={3}>
          <Heading as="h1" size="xl">
            Blog
          </Heading>
          <Text color="gray.600" _dark={{ color: 'gray.300' }}>
            Posts published from your WordPress CMS.
          </Text>
        </Stack>

        {posts && posts.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </SimpleGrid>
        ) : (
          <Text color="gray.500">No posts found yet.</Text>
        )}
      </Stack>
    </Container>
  )
}
