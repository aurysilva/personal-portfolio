import { Box, Container, Heading, Image, Stack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { PageMeta } from '@/components/seo/PageMeta'
import { WpContent } from '@/components/content/WpContent'
import {
  ErrorState,
  LoadingState,
} from '@/components/content/AsyncStateViews'
import {
  getFeaturedImageUrl,
  stripHtml,
  usePage,
} from '@/lib/wordpress'

export function PageView() {
  const { slug } = useParams<{ slug: string }>()
  const { data: page, loading, error } = usePage(slug)

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

  if (!page) {
    return (
      <Container>
        <ErrorState title="Page not found" message="This page does not exist in WordPress." />
      </Container>
    )
  }

  const featuredImage = getFeaturedImageUrl(page)
  const title = stripHtml(page.title.rendered)
  const description = stripHtml(page.excerpt.rendered)

  return (
    <Container>
      <PageMeta title={title} description={description} />
      <Stack spacing={8}>
        {featuredImage && (
          <Image
            src={featuredImage}
            alt={title}
            borderRadius="2xl"
            maxH="360px"
            w="100%"
            objectFit="cover"
          />
        )}
        <Box>
          <Heading as="h1" size="xl" mb={6}>
            {title}
          </Heading>
          <WpContent html={page.content.rendered} />
        </Box>
      </Stack>
    </Container>
  )
}
