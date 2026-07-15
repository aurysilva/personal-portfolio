import type { ReactNode } from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useProfile } from '@/context/ProfileContext'
import { sectionPy } from '@/theme'

export function AboutSection() {
  const { profile } = useProfile()

  return (
    <Box as="section" id="about" py={sectionPy}>
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: 10, lg: 20 }}
          align="flex-start"
        >
          <Box flexShrink={0}>
            <Text
              fontSize={{ base: '6xl', md: '8xl' }}
              fontWeight="800"
              lineHeight="1"
              bgGradient="linear(to-b, brand.300, brand.700)"
              bgClip="text"
              fontFamily="mono"
            >
              01
            </Text>
          </Box>

          <Stack spacing={8} flex="1">
            <Stack spacing={4} maxW="3xl">
              <Text
                fontSize="sm"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider"
                color="brand.400"
              >
                Who am I?
              </Text>
              <Heading
                size={{ base: 'xl', md: '2xl' }}
                fontWeight="800"
                letterSpacing="-0.02em"
                lineHeight="shorter"
              >
                Building digital experiences that blend design &amp; engineering
              </Heading>
            </Stack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {profile.about.split('\n\n').slice(0, 2).map((paragraph) => (
                <Text key={paragraph.slice(0, 40)} color="gray.400" lineHeight="1.9" fontSize="md">
                  {paragraph}
                </Text>
              ))}
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3} pt={2}>
              {profile.highlights.map((item) => (
                <Highlight key={item}>{item}</Highlight>
              ))}
            </SimpleGrid>
          </Stack>

          <Box
            display={{ base: 'none', lg: 'block' }}
            w="280px"
            flexShrink={0}
            alignSelf="stretch"
          >
            <Box
              h="100%"
              minH="320px"
              borderRadius="2xl"
              bgGradient="linear(135deg, surface.700, surface.800)"
              borderWidth="1px"
              borderColor="whiteAlpha.100"
              p={6}
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top={-20}
                right={-20}
                w="160px"
                h="160px"
                borderRadius="full"
                bg="brand.500"
                opacity={0.15}
                filter="blur(40px)"
              />
              <Stack spacing={6} position="relative">
                <Text fontSize="xs" fontWeight="semibold" textTransform="uppercase" letterSpacing="wider" color="gray.500">
                  Focus areas
                </Text>
                {profile.roles.map((role) => (
                  <Text key={role} fontWeight="600" fontSize="sm" color="gray.200">
                    {role}
                  </Text>
                ))}
              </Stack>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

function Highlight({ children }: { children: ReactNode }) {
  return (
    <Flex align="center" gap={3}>
      <Box boxSize={1.5} borderRadius="full" bg="brand.400" flexShrink={0} />
      <Text color="gray.300" fontSize="sm">
        {children}
      </Text>
    </Flex>
  )
}
