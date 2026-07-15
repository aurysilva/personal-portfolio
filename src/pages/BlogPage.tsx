import { Container, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { PageMeta } from '@/components/seo/PageMeta'
import { PostCard } from '@/components/content/PostCard'
import {
  ErrorState,
  LoadingState,
} from '@/components/content/AsyncStateViews'
import { useProfile } from '@/context/ProfileContext'
import { usePosts } from '@/lib/wordpress'

export function BlogPage() {
  const { profile } = useProfile()
  const { data: posts, loading, error } = usePosts({ perPage: 20 })

  if (loading) {
    return <LoadingState label="Loading posts…" />
  }

  if (error) {
    return (
      <Container py={12}>
        <ErrorState message={error.message} />
      </Container>
    )
  }

  return (
    <Container py={{ base: 8, md: 12 }}>
      <PageMeta
        title={`Blog | ${profile.name}`}
        description="Articles on UX design, React, email development, and full-stack development."
      />
      <Stack spacing={10}>
        <Stack spacing={3} maxW="2xl">
          <Text color="brand.300" fontWeight="semibold" textTransform="uppercase" letterSpacing="wide" fontSize="sm">
            Blog
          </Text>
          <Heading as="h1" size="xl">
            Materials I find interesting
          </Heading>
          <Text color="gray.400" fontSize="lg">
            Thoughts on building better digital experiences — pulled live from WordPress.
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
