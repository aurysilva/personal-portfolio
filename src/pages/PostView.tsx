import {
  Badge,
  Box,
  Container,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { PageMeta } from '@/components/seo/PageMeta'
import { WpContent } from '@/components/content/WpContent'
import {
  ErrorState,
  LoadingState,
} from '@/components/content/AsyncStateViews'
import {
  formatDate,
  getFeaturedImageUrl,
  stripHtml,
  usePost,
} from '@/lib/wordpress'

export function PostView() {
  const { slug } = useParams<{ slug: string }>()
  const { data: post, loading, error } = usePost(slug)

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return (
      <Container>
        <ErrorState message={error.message} />
      </Container>
    )
  }

  if (!post) {
    return (
      <Container>
        <ErrorState title="Post not found" message="This post does not exist in WordPress." />
      </Container>
    )
  }

  const featuredImage = getFeaturedImageUrl(post)
  const title = stripHtml(post.title.rendered)
  const description = stripHtml(post.excerpt.rendered)

  return (
    <Container maxW="container.md">
      <PageMeta title={title} description={description} />
      <Stack spacing={8}>
        <Stack spacing={4}>
          <Badge alignSelf="flex-start" colorScheme="brand">
            {formatDate(post.date)}
          </Badge>
          <Heading as="h1" size="xl">
            {title}
          </Heading>
          {description && (
            <Text fontSize="lg" color="gray.600" _dark={{ color: 'gray.300' }}>
              {description}
            </Text>
          )}
        </Stack>

        {featuredImage && (
          <Image
            src={featuredImage}
            alt={title}
            borderRadius="2xl"
            w="100%"
            maxH="420px"
            objectFit="cover"
          />
        )}

        <Box>
          <WpContent html={post.content.rendered} />
        </Box>

        <Text fontSize="sm" color="gray.500">
          <RouterLink to="/blog">← Back to blog</RouterLink>
        </Text>
      </Stack>
    </Container>
  )
}
