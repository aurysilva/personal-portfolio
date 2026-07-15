import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import type { WpPost } from '@/lib/wordpress'
import { formatDate, getPostCategories } from '@/lib/wordpress'
import { profile } from '@/data/profile'

interface ArticleSidebarProps {
  post: WpPost
}

export function ArticleSidebar({ post }: ArticleSidebarProps) {
  const categories = getPostCategories(post)

  return (
    <Stack
      spacing={6}
      position={{ lg: 'sticky' }}
      top={{ lg: '100px' }}
      alignSelf="flex-start"
    >
      <Box
        p={5}
        borderRadius="xl"
        bg="surface.800"
        borderWidth="1px"
        borderColor="whiteAlpha.100"
      >
        <Stack spacing={4}>
          <Text fontSize="xs" fontWeight="semibold" textTransform="uppercase" letterSpacing="wider" color="gray.500">
            In this article
          </Text>
          <Stack spacing={2} fontSize="sm">
            <MetaRow label="Published" value={formatDate(post.date)} />
            {categories[0] && (
              <MetaRow label="Category" value={categories[0].name} accent />
            )}
          </Stack>
        </Stack>
      </Box>

      <Stack spacing={3}>
        <Button
          as={RouterLink}
          to="/blog"
          variant="outline"
          borderColor="whiteAlpha.200"
          size="sm"
          w="100%"
        >
          ← All posts
        </Button>
        <Button
          as="a"
          href={`mailto:${profile.email}?subject=Re: Blog post`}
          variant="ghost"
          size="sm"
          w="100%"
          color="gray.400"
        >
          Discuss this post
        </Button>
      </Stack>
    </Stack>
  )
}

function MetaRow({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <Flex justify="space-between" gap={4}>
      <Text color="gray.500">{label}</Text>
      <Text fontWeight="medium" color={accent ? 'brand.300' : 'gray.200'} textAlign="right">
        {value}
      </Text>
    </Flex>
  )
}
