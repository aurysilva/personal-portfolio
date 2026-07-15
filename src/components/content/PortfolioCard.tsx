import {
  Badge,
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
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
import { decodeHtmlEntities, extractProjectLinks } from '@/lib/content'

interface PortfolioCardProps {
  item: WpPortfolio
  compact?: boolean
}

export function PortfolioCard({ item, compact = false }: PortfolioCardProps) {
  const imageUrl = getFeaturedImageUrl(item, 'medium')
  const title = decodeHtmlEntities(stripHtml(item.title.rendered))
  const terms = getPortfolioTerms(item).slice(0, compact ? 2 : 3)
  const links = extractProjectLinks(item.content.rendered)
  const year = new Date(item.date).getFullYear()

  const imageHeight = compact ? '190px' : '240px'

  return (
    <LinkBox
      as="article"
      role="group"
      borderRadius="2xl"
      overflow="hidden"
      bg="surface.800"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      transition="all 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
      _hover={{
        transform: 'translateY(-8px)',
        borderColor: 'brand.500',
        shadow: '0 24px 48px rgba(6, 182, 212, 0.15)',
      }}
      h="100%"
      display="flex"
      flexDirection="column"
      position="relative"
      isolation="isolate"
    >
      <Box position="absolute" inset={0} zIndex={0} overflow="hidden" bg="surface.700">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            position="absolute"
            inset={0}
            h="100%"
            w="100%"
            objectFit="cover"
            transition="transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
            _groupHover={{ transform: 'scale(1.08)' }}
          />
        ) : (
          <Flex
            position="absolute"
            inset={0}
            bg="surface.600"
            align="center"
            justify="center"
          >
            <Text fontSize="4xl" color="whiteAlpha.200" fontWeight="800">
              {title.charAt(0)}
            </Text>
          </Flex>
        )}

        <Box
          position="absolute"
          inset={0}
          pointerEvents="none"
          sx={{
            background: `
              linear-gradient(
                to top,
                var(--chakra-colors-surface-900) 0%,
                rgba(15, 23, 42, 0.88) 18%,
                rgba(15, 23, 42, 0.45) 42%,
                transparent 72%
              ),
              linear-gradient(
                to right,
                transparent 0%,
                rgba(15, 23, 42, 0.55) 12%,
                rgba(15, 23, 42, 0.55) 88%,
                transparent 100%
              )
            `,
          }}
          opacity={0.92}
          transition="opacity 0.3s"
          _groupHover={{ opacity: 1 }}
        />
      </Box>

      {terms[0] && (
        <Badge
          position="absolute"
          top={3}
          left={3}
          zIndex={2}
          px={2.5}
          py={1}
          borderRadius="full"
          bg="blackAlpha.600"
          backdropFilter="blur(8px)"
          color="brand.200"
          fontSize="10px"
          fontWeight="semibold"
          textTransform="uppercase"
          letterSpacing="wider"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
        >
          {terms[0].name}
        </Badge>
      )}

      <Box flex="1" minH={imageHeight} position="relative" zIndex={1}>
        <Flex
          position="absolute"
          bottom={3}
          right={3}
          boxSize={9}
          borderRadius="full"
          bg="brand.500"
          align="center"
          justify="center"
          opacity={0}
          transform="translateY(8px)"
          transition="all 0.3s ease"
          _groupHover={{ opacity: 1, transform: 'translateY(0)' }}
          shadow="lg"
        >
          <ArrowIcon />
        </Flex>
      </Box>

      <Stack p={5} spacing={3} flexShrink={0} position="relative" zIndex={2}>
        <Flex justify="space-between" align="center" gap={2}>
          <Text fontSize="xs" color="gray.500" fontFamily="mono">
            {year}
          </Text>
          <Text
            fontSize="xs"
            color="brand.400"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Case study
          </Text>
        </Flex>

        <Text
          fontWeight="700"
          fontSize={compact ? 'sm' : 'md'}
          lineHeight="short"
          noOfLines={2}
          color="white"
          transition="color 0.2s"
          _groupHover={{ color: 'brand.200' }}
        >
          <LinkOverlay as={RouterLink} to={`/portfolio/${item.slug}`}>
            {title}
          </LinkOverlay>
        </Text>

        {terms.length > 1 && (
          <HStack spacing={1.5} flexWrap="wrap">
            {terms.slice(1).map((term) => (
              <Text
                key={term.id}
                fontSize="xs"
                color="gray.500"
                px={2}
                py={0.5}
                borderRadius="md"
                bg="surface.700"
                borderWidth="1px"
                borderColor="whiteAlpha.100"
              >
                {term.name}
              </Text>
            ))}
          </HStack>
        )}

        {!compact && (links.live || links.github) && (
          <HStack spacing={3} mt="auto" pt={2} onClick={(e) => e.stopPropagation()}>
            {links.live && (
              <ExternalLink href={links.live} label="Live demo" />
            )}
            {links.github && (
              <ExternalLink href={links.github} label="GitHub" />
            )}
          </HStack>
        )}

        {compact && (
          <Text
            mt="auto"
            pt={2}
            fontSize="xs"
            color="gray.500"
            _groupHover={{ color: 'brand.300' }}
            transition="color 0.2s"
          >
            View project →
          </Text>
        )}
      </Stack>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        h="2px"
        w="0%"
        bgGradient="linear(to-r, brand.400, accent.400)"
        transition="width 0.35s ease"
        _groupHover={{ w: '100%' }}
      />
    </LinkBox>
  )
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      isExternal
      fontSize="xs"
      fontWeight="medium"
      color="gray.400"
      display="inline-flex"
      alignItems="center"
      gap={1}
      _hover={{ color: 'brand.300', textDecoration: 'none' }}
    >
      {label}
      <Text as="span" fontSize="10px">
        ↗
      </Text>
    </Link>
  )
}

function ArrowIcon() {
  return (
    <Icon viewBox="0 0 24 24" boxSize={4} color="white">
      <path
        fill="currentColor"
        d="M5 12h12.17l-4.59 4.59L14 18l6-6-6-6-1.41 1.41L17.17 11H5v1z"
      />
    </Icon>
  )
}
