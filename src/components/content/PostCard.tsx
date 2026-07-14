import {
  Badge,
  Box,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import type { WpPost } from '@/lib/wordpress'
import {
  formatDate,
  getFeaturedImageUrl,
  stripHtml,
} from '@/lib/wordpress'

interface PostCardProps {
  post: WpPost
}

export function PostCard({ post }: PostCardProps) {
  const imageUrl = getFeaturedImageUrl(post, 'medium')
  const excerpt = stripHtml(post.excerpt.rendered)
  const title = stripHtml(post.title.rendered)

  return (
    <LinkBox
      as="article"
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      bg="surface.800"
      borderColor="whiteAlpha.100"
      transition="all 0.25s ease"
      _hover={{
        transform: 'translateY(-4px)',
        borderColor: 'brand.500',
        shadow: '0 16px 32px rgba(6, 182, 212, 0.1)',
      }}
      h="100%"
      display="flex"
      flexDirection="column"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          h="200px"
          w="100%"
          objectFit="cover"
        />
      ) : (
        <Box h="200px" bg="surface.700" />
      )}
      <Stack p={6} spacing={3} flex="1">
        <Badge alignSelf="flex-start" colorScheme="brand" variant="subtle">
          {formatDate(post.date)}
        </Badge>
        <Heading size="md" noOfLines={2}>
          <LinkOverlay as={RouterLink} to={`/blog/${post.slug}`}>
            {title}
          </LinkOverlay>
        </Heading>
        {excerpt && (
          <Text color="gray.400" noOfLines={3}>
            {excerpt}
          </Text>
        )}
      </Stack>
    </LinkBox>
  )
}
