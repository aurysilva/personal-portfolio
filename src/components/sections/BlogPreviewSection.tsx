import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { PostCard } from '@/components/content/PostCard'
import {
  ErrorState,
  LoadingState,
} from '@/components/content/AsyncStateViews'
import { SectionHeading } from '@/components/ui/SectionHeading'
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
    <Box as="section" id="blog" py={sectionPy}>
      <Container>
        <Stack spacing={10}>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'flex-start', md: 'flex-end' }}
            spacing={6}
          >
            <SectionHeading
              eyebrow="What do I find interesting?"
              title="Materials I find interesting"
              description="Thoughts on UX, React, email development, and full-stack craft."
            />
            <Button
              as={RouterLink}
              to="/blog"
              variant="outline"
              borderColor="whiteAlpha.300"
              flexShrink={0}
            >
              View all posts
            </Button>
          </Stack>

          {posts && posts.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </SimpleGrid>
          ) : null}
        </Stack>
      </Container>
    </Box>
  )
}
