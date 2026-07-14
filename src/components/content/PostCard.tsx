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

  return (
    <LinkBox
      as="article"
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
      transition="transform 0.2s ease, box-shadow 0.2s ease"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
      }}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={stripHtml(post.title.rendered)}
          h="200px"
          w="100%"
          objectFit="cover"
        />
      )}
      <Stack p={6} spacing={3}>
        <Badge alignSelf="flex-start" colorScheme="brand">
          {formatDate(post.date)}
        </Badge>
        <Heading size="md">
          <LinkOverlay as={RouterLink} to={`/blog/${post.slug}`}>
            <Box dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </LinkOverlay>
        </Heading>
        {excerpt && (
          <Text color="gray.600" _dark={{ color: 'gray.300' }} noOfLines={3}>
            {excerpt}
          </Text>
        )}
      </Stack>
    </LinkBox>
  )
}
