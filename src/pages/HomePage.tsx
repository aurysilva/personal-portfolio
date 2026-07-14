import {
  Box,
  Container,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
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
  useSiteInfo,
} from '@/lib/wordpress'

const homeSlug = import.meta.env.VITE_HOME_PAGE_SLUG ?? 'home'

export function HomePage() {
  const { data: siteInfo } = useSiteInfo()
  const { data: page, loading, error } = usePage(homeSlug)

  if (loading) {
    return <LoadingState label="Loading homepage…" />
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
        <Stack spacing={6} py={10} textAlign="center">
          <PageMeta title={siteInfo?.name} description={siteInfo?.description} />
          <Heading size="2xl">{siteInfo?.name ?? 'Welcome'}</Heading>
          <Text color="gray.600" _dark={{ color: 'gray.300' }} maxW="2xl" mx="auto">
            {siteInfo?.description ??
              'Connect your WordPress site by setting VITE_WORDPRESS_URL in .env'}
          </Text>
        </Stack>
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
            maxH="420px"
            w="100%"
            objectFit="cover"
          />
        )}
        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            {title}
          </Heading>
          <WpContent html={page.content.rendered} />
        </Box>
      </Stack>
    </Container>
  )
}
