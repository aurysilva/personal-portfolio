import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import type { WpPortfolio } from '@/lib/wordpress'
import {
  getFeaturedImageUrl,
  getPortfolioTerms,
  stripHtml,
} from '@/lib/wordpress'
import { decodeHtmlEntities } from '@/lib/content'

interface ProjectHeroProps {
  item: WpPortfolio
}

export function ProjectHero({ item }: ProjectHeroProps) {
  const imageUrl = getFeaturedImageUrl(item)
  const title = decodeHtmlEntities(stripHtml(item.title.rendered))
  const terms = getPortfolioTerms(item)

  return (
    <Box
      as="header"
      position="relative"
      minH={{ base: '70vh', md: '85vh' }}
      display="flex"
      alignItems="flex-end"
      overflow="hidden"
    >
      {imageUrl && (
        <Box position="absolute" inset={0}>
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
            bgGradient="linear(to-t, surface.900 0%, rgba(7,11,20,0.6) 40%, rgba(7,11,20,0.3) 100%)"
          />
        </Box>
      )}

      {!imageUrl && (
        <Box
          position="absolute"
          inset={0}
          bgGradient="radial(circle at 30% 40%, rgba(6,182,212,0.15), transparent 50%), radial(circle at 80% 20%, rgba(245,158,11,0.1), transparent 40%)"
          bg="surface.900"
        />
      )}

      <Container
        position="relative"
        pb={{ base: 10, md: 16 }}
        pt={{ base: 24, md: 32 }}
        maxW="container.xl"
      >
        <Flex align="center" gap={2} fontSize="sm" color="gray.400" mb={6}>
          <Text
            as={RouterLink}
            to="/portfolio"
            _hover={{ color: 'brand.300' }}
            transition="color 0.2s"
          >
            Portfolio
          </Text>
          <Text color="gray.600">/</Text>
          <Text color="gray.500">Project Details</Text>
        </Flex>

        {terms.length > 0 && (
          <HStack spacing={2} mb={5} flexWrap="wrap">
            {terms.map((term) => (
              <Text
                key={term.id}
                fontSize="xs"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider"
                color="brand.300"
                px={3}
                py={1}
                borderWidth="1px"
                borderColor="brand.700"
                borderRadius="full"
              >
                {term.name}
              </Text>
            ))}
          </HStack>
        )}

        <Heading
          as="h1"
          maxW="5xl"
          fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
          fontWeight="800"
          lineHeight="1.05"
          letterSpacing="-0.03em"
        >
          {title}
        </Heading>
      </Container>
    </Box>
  )
}
