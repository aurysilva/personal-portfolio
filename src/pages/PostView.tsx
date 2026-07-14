import {
  Badge,
  Box,
  Button,
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
      <Container py={12}>
        <ErrorState message={error.message} />
      </Container>
    )
  }

  if (!post) {
    return (
      <Container py={12}>
        <ErrorState title="Post not found" message="This post does not exist in WordPress." />
      </Container>
    )
  }

  const featuredImage = getFeaturedImageUrl(post)
  const title = stripHtml(post.title.rendered)
  const description = stripHtml(post.excerpt.rendered)

  return (
    <Container py={{ base: 8, md: 12 }} maxW="container.md">
      <PageMeta title={`${title} | Blog`} description={description} />
      <Stack spacing={8}>
        <Stack spacing={4}>
          <Button
            as={RouterLink}
            to="/blog"
            variant="ghost"
            alignSelf="flex-start"
            color="gray.400"
            size="sm"
          >
            ← Back to blog
          </Button>
          <Badge alignSelf="flex-start" colorScheme="brand">
            {formatDate(post.date)}
          </Badge>
          <Heading as="h1" size="xl">
            {title}
          </Heading>
          {description && (
            <Text fontSize="lg" color="gray.400">
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
            borderWidth="1px"
            borderColor="whiteAlpha.100"
          />
        )}

        <Box
          p={{ base: 0, md: 2 }}
          borderRadius="xl"
          bg="surface.800"
          borderWidth={{ base: 0, md: '1px' }}
          borderColor="whiteAlpha.100"
        >
          <WpContent html={post.content.rendered} />
        </Box>
      </Stack>
    </Container>
  )
}
