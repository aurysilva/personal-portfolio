import { Box, Button, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { PageMeta } from '@/components/seo/PageMeta'
import { ProjectHero } from '@/components/portfolio/ProjectHero'
import { ProjectMetaGrid } from '@/components/portfolio/ProjectMetaGrid'
import { ProjectQuoteBlock } from '@/components/portfolio/ProjectQuoteBlock'
import { ProjectStorySections } from '@/components/portfolio/ProjectStorySections'
import { ProjectGallery } from '@/components/portfolio/ProjectGallery'
import { RelatedProjects } from '@/components/portfolio/RelatedProjects'
import {
  ErrorState,
  LoadingState,
} from '@/components/content/AsyncStateViews'
import { stripHtml, usePortfolioItem } from '@/lib/wordpress'
import {
  decodeHtmlEntities,
  extractProjectLinks,
  parseProjectStory,
} from '@/lib/content'
import { profile } from '@/data/profile'

export function PortfolioView() {
  const { slug } = useParams<{ slug: string }>()
  const { data: item, loading, error } = usePortfolioItem(slug)

  if (loading) {
    return <LoadingState label="Loading project…" />
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

  const title = decodeHtmlEntities(stripHtml(item.title.rendered))
  const links = extractProjectLinks(item.content.rendered)
  const story = parseProjectStory(item.content.rendered)
  const summary = story.quote?.text ?? title

  return (
    <Box as="article" bg="surface.900">
      <PageMeta title={`${title} | Portfolio`} description={summary} />

      <ProjectHero item={item} />

      <ProjectMetaGrid item={item} quote={story.quote} links={links} />

      {story.quote && <ProjectQuoteBlock quote={story.quote} />}

      <Box py={{ base: 12, md: 20 }}>
        <Container maxW="container.lg" mb={{ base: 12, md: 16 }}>
          <Heading
            size={{ base: 'lg', md: 'xl' }}
            fontWeight="700"
            letterSpacing="-0.02em"
            maxW="3xl"
          >
            Crafting digital experiences that solve real business problems
          </Heading>
        </Container>

        <ProjectStorySections sections={story.sections} />
      </Box>

      <ProjectGallery images={story.images} />

      <ProjectCta links={links} />

      {slug && <RelatedProjects currentSlug={slug} />}
    </Box>
  )
}

function ProjectCta({ links }: { links: { live?: string; github?: string } }) {
  return (
    <Box
      py={{ base: 16, md: 20 }}
      borderTopWidth="1px"
      borderColor="whiteAlpha.100"
      bg="surface.800"
    >
      <Container maxW="container.lg">
        <Stack spacing={8} textAlign="center" align="center">
          <Stack spacing={3}>
            <Heading size="lg">Interested in working together?</Heading>
            <Text color="gray.400" maxW="lg">
              I design and build landing pages, email campaigns, React applications,
              and CMS-driven sites for agencies and brands.
            </Text>
          </Stack>

          <Flex gap={4} flexWrap="wrap" justify="center">
            {links.live && (
              <Button
                as="a"
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                bgGradient="linear(to-r, brand.500, brand.400)"
                _hover={{ bgGradient: 'linear(to-r, brand.400, brand.300)' }}
              >
                View live project ↗
              </Button>
            )}
            <Button
              as="a"
              href={`mailto:${profile.email}`}
              size="lg"
              variant="outline"
              borderColor="whiteAlpha.300"
            >
              Get in touch
            </Button>
            <Button
              as={RouterLink}
              to="/portfolio"
              size="lg"
              variant="ghost"
              color="gray.400"
            >
              More projects
            </Button>
          </Flex>
        </Stack>
      </Container>
    </Box>
  )
}
