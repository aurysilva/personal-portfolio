import { Box, Button, Container, Flex, Stack, Text } from '@chakra-ui/react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { PageMeta } from '@/components/seo/PageMeta'
import { ArticleContent } from '@/components/content/ArticleContent'
import { ArticleHero } from '@/components/blog/ArticleHero'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import {
  ErrorState,
  LoadingState,
} from '@/components/content/AsyncStateViews'
import {
  stripHtml,
  usePost,
} from '@/lib/wordpress'
import { decodeHtmlEntities } from '@/lib/content'
import { useProfile } from '@/context/ProfileContext'

export function PostView() {
  const { slug } = useParams<{ slug: string }>()
  const { data: post, loading, error } = usePost(slug)

  if (loading) {
    return <LoadingState label="Loading article…" />
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

  const title = decodeHtmlEntities(stripHtml(post.title.rendered))
  const description = decodeHtmlEntities(stripHtml(post.excerpt.rendered))

  return (
    <Box as="article">
      <PageMeta title={`${title} | Blog`} description={description} />

      <ArticleHero post={post} />

      <Container maxW="1200px" pb={{ base: 8, md: 12 }}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: 8, lg: 12 }}
          align="flex-start"
        >
          {/* <Box display={{ base: 'none', lg: 'block' }} w="220px" flexShrink={0}>
            <ArticleSidebar post={post} />
          </Box> */}

          <Box flex="1" minW={0}>
            <Box
              p={{ base: 6, md: 10 }}
              borderRadius="2xl"
              bg="surface.800"
              borderWidth="1px"
              borderColor="whiteAlpha.100"
              shadow="0 4px 24px rgba(0,0,0,0.2)"
            >
              <ArticleContent html={post.content.rendered} />
            </Box>

            <ArticleFooter />
          </Box>
        </Flex>
      </Container>

      {slug && <RelatedPosts currentSlug={slug} />}
    </Box>
  )
}

function ArticleFooter() {
  const { profile } = useProfile()

  return (
    <Stack
      mt={10}
      p={6}
      borderRadius="xl"
      bg="surface.700"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      spacing={4}
      textAlign="center"
    >
      <Text fontWeight="600">Enjoyed this article?</Text>
      <Text fontSize="sm" color="gray.400">
        I write about UX, React, email development, and full-stack craft. Get in touch if you&apos;d like to collaborate.
      </Text>
      <Flex gap={3} justify="center" flexWrap="wrap">
        <Button as={RouterLink} to="/blog" variant="outline" borderColor="whiteAlpha.300" size="sm">
          More articles
        </Button>
        <Button
          as="a"
          href={`mailto:${profile.email}`}
          size="sm"
          bgGradient="linear(to-r, brand.500, brand.400)"
          _hover={{ bgGradient: 'linear(to-r, brand.400, brand.300)' }}
        >
          Contact {profile.name.split(' ')[0]}
        </Button>
      </Flex>
    </Stack>
  )
}
