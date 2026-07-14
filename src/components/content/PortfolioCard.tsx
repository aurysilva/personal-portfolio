import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import type { WpPortfolio } from '@/lib/wordpress'
import {
  getFeaturedImageUrl,
  getPortfolioTerms,
  stripHtml,
} from '@/lib/wordpress'
import { extractProjectLinks } from '@/lib/content'

interface PortfolioCardProps {
  item: WpPortfolio
  compact?: boolean
}

export function PortfolioCard({ item, compact = false }: PortfolioCardProps) {
  const imageUrl = getFeaturedImageUrl(item, 'medium')
  const title = stripHtml(item.title.rendered)
  const terms = getPortfolioTerms(item).slice(0, 3)
  const links = extractProjectLinks(item.content.rendered)

  return (
    <LinkBox
      as="article"
      borderRadius="2xl"
      overflow="hidden"
      bg="surface.800"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      transition="all 0.25s ease"
      _hover={{
        transform: 'translateY(-6px)',
        borderColor: 'brand.500',
        shadow: '0 20px 40px rgba(6, 182, 212, 0.12)',
      }}
      h="100%"
      display="flex"
      flexDirection="column"
    >
      <Box position="relative" overflow="hidden" bg="surface.700">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            h={compact ? '180px' : '220px'}
            w="100%"
            objectFit="cover"
            transition="transform 0.4s ease"
            _groupHover={{ transform: 'scale(1.05)' }}
          />
        ) : (
          <Box h={compact ? '180px' : '220px'} bg="surface.600" />
        )}
      </Box>

      <Stack p={5} spacing={4} flex="1">
        <HStack spacing={2} flexWrap="wrap">
          {terms.map((term) => (
            <Badge key={term.id} variant="subtle" colorScheme="brand" fontSize="xs">
              {term.name}
            </Badge>
          ))}
        </HStack>

        <Text fontWeight="700" fontSize="md" noOfLines={2}>
          <LinkOverlay as={RouterLink} to={`/portfolio/${item.slug}`}>
            {title}
          </LinkOverlay>
        </Text>

        {!compact && (
          <HStack spacing={2} mt="auto" pt={2}>
            {links.live && (
              <Button
                as="a"
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                size="xs"
                variant="outline"
                onClick={(e) => e.stopPropagation()}
              >
                Live
              </Button>
            )}
            {links.github && (
              <Button
                as="a"
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                size="xs"
                variant="ghost"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </Button>
            )}
          </HStack>
        )}
      </Stack>
    </LinkBox>
  )
}
