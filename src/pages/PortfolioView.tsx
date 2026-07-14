import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
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
  getFeaturedImageUrl,
  getPortfolioTerms,
  stripHtml,
  usePortfolioItem,
} from '@/lib/wordpress'
import { extractProjectLinks } from '@/lib/content'

export function PortfolioView() {
  const { slug } = useParams<{ slug: string }>()
  const { data: item, loading, error } = usePortfolioItem(slug)

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

  if (!item) {
    return (
      <Container py={12}>
        <ErrorState
          title="Project not found"
          message="This portfolio item does not exist in WordPress."
        />
      </Container>
    )
  }

  const title = stripHtml(item.title.rendered)
  const imageUrl = getFeaturedImageUrl(item)
  const terms = getPortfolioTerms(item)
  const links = extractProjectLinks(item.content.rendered)

  return (
    <Container py={{ base: 8, md: 12 }} maxW="container.md">
      <PageMeta title={`${title} | Portfolio`} />
      <Stack spacing={8}>
        <Stack spacing={4}>
          <Button
            as={RouterLink}
            to="/portfolio"
            variant="ghost"
            alignSelf="flex-start"
            color="gray.400"
            size="sm"
          >
            ← Back to portfolio
          </Button>

          <HStack spacing={2} flexWrap="wrap">
            {terms.map((term) => (
              <Badge key={term.id} colorScheme="brand">
                {term.name}
              </Badge>
            ))}
          </HStack>

          <Heading as="h1" size="xl">
            {title}
          </Heading>

          <HStack spacing={3} flexWrap="wrap">
            {links.live && (
              <Button as="a" href={links.live} target="_blank" rel="noopener noreferrer">
                View live
              </Button>
            )}
            {links.github && (
              <Button
                as="a"
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                borderColor="whiteAlpha.300"
              >
                GitHub
              </Button>
            )}
            {links.client && (
              <Button
                as="a"
                href={links.client}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                Client site
              </Button>
            )}
          </HStack>
        </Stack>

        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            borderRadius="2xl"
            w="100%"
            maxH="480px"
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
          <WpContent html={item.content.rendered} />
        </Box>

        <Text fontSize="sm" color="gray.500">
          Published {new Date(item.date).toLocaleDateString()}
        </Text>
      </Stack>
    </Container>
  )
}
