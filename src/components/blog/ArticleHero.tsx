import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import type { WpPost } from '@/lib/wordpress'
import {
  formatDate,
  getFeaturedImageUrl,
  getPostAuthor,
  getPostCategories,
  stripHtml,
} from '@/lib/wordpress'
import { decodeHtmlEntities, estimateReadingTime } from '@/lib/content'
import { profile } from '@/data/profile'

interface ArticleHeroProps {
  post: WpPost
}

export function ArticleHero({ post }: ArticleHeroProps) {
  const imageUrl = getFeaturedImageUrl(post)
  const title = decodeHtmlEntities(stripHtml(post.title.rendered))
  const excerpt = decodeHtmlEntities(stripHtml(post.excerpt.rendered))
  const categories = getPostCategories(post)
  const author = getPostAuthor(post) ?? profile.name
  const readingTime = estimateReadingTime(post.content.rendered)

  return (
    <Box as="header" position="relative" mb={{ base: 8, md: 12 }}>
      {imageUrl && (
        <Box
          position="absolute"
          inset={0}
          maxH={{ base: '320px', md: '480px' }}
          overflow="hidden"
        >
          <Image
            src={imageUrl}
            alt=""
            aria-hidden
            w="100%"
            h="100%"
            objectFit="cover"
            filter="brightness(0.35)"
          />
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-b, transparent 20%, surface.900 95%)"
          />
        </Box>
      )}

      <Container
        position="relative"
        pt={{ base: imageUrl ? 28 : 8, md: imageUrl ? 36 : 12 }}
        pb={8}
        maxW="container.lg"
      >
        <Stack spacing={6}>
          <Flex align="center" gap={2} fontSize="sm" color="gray.400">
            <Text
              as={RouterLink}
              to="/blog"
              _hover={{ color: 'brand.300' }}
              transition="color 0.2s"
            >
              Blog
            </Text>
            <Text>/</Text>
            {categories[0] && (
              <>
                <Text color="brand.300">{categories[0].name}</Text>
                <Text>/</Text>
              </>
            )}
            <Text noOfLines={1} color="gray.500">
              {title}
            </Text>
          </Flex>

          <Stack spacing={4} maxW="5xl">
            {categories.length > 0 && (
              <Flex gap={2} flexWrap="wrap">
                {categories.map((cat) => (
                  <Badge
                    key={cat.id}
                    colorScheme="brand"
                    variant="subtle"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    {cat.name}
                  </Badge>
                ))}
              </Flex>
            )}

            <Heading
              as="h1"
              size={{ base: 'xl', md: '2xl', lg: '3xl' }}
              fontWeight="800"
              lineHeight="shorter"
              letterSpacing="-0.02em"
            >
              {title}
            </Heading>

            {excerpt && (
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.400"
                lineHeight="tall"
                maxW="2xl"
              >
                {excerpt}
              </Text>
            )}
          </Stack>

          <Flex
            align="center"
            gap={{ base: 4, md: 6 }}
            flexWrap="wrap"
            pt={2}
            borderTopWidth="1px"
            borderColor="whiteAlpha.100"
          >
            <Flex align="center" gap={3}>
              <Box
                boxSize={10}
                borderRadius="full"
                bgGradient="linear(to-br, brand.500, brand.700)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="700"
                fontSize="sm"
                flexShrink={0}
              >
                {author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </Box>
              <Stack spacing={0}>
                <Text fontWeight="600" fontSize="sm">
                  {author}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {profile.title}
                </Text>
              </Stack>
            </Flex>

            <Box w="1px" h={8} bg="whiteAlpha.200" display={{ base: 'none', sm: 'block' }} />

            <Text fontSize="sm" color="gray.400">
              {formatDate(post.date)}
            </Text>

            <Text fontSize="sm" color="gray.500">
              {readingTime} min read
            </Text>
          </Flex>
        </Stack>
      </Container>
    </Box>
  )
}
