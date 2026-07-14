import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { profile } from '@/data/profile'
import { sectionPy } from '@/theme'

const cvUrl = import.meta.env.VITE_CV_URL

export function HeroSection() {
  return (
    <Box
      as="section"
      id="hero"
      position="relative"
      overflow="hidden"
      py={sectionPy}
    >
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(circle at 20% 20%, rgba(6,182,212,0.15), transparent 45%), radial(circle at 80% 0%, rgba(245,158,11,0.12), transparent 35%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        inset={0}
        opacity={0.35}
        bgImage="linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
        bgSize="48px 48px"
        pointerEvents="none"
      />

      <Container position="relative">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'flex-start', lg: 'center' }}
          justify="space-between"
          gap={12}
        >
          <Stack spacing={6} maxW="3xl">
            <HStack spacing={3} flexWrap="wrap">
              {profile.available && (
                <Badge
                  colorScheme="green"
                  variant="subtle"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  ● Available for work
                </Badge>
              )}
              <Badge variant="outline" colorScheme="gray" borderRadius="full" px={3}>
                {profile.location}
              </Badge>
            </HStack>

            <Stack spacing={2}>
              <Text color="brand.300" fontWeight="medium">
                Hi, I&apos;m
              </Text>
              <Text
                as="h1"
                fontSize={{ base: '4xl', md: '6xl', xl: '7xl' }}
                fontWeight="800"
                lineHeight="1"
                letterSpacing="-0.03em"
              >
                {profile.name}
              </Text>
              <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                color="gray.400"
                fontWeight="500"
              >
                {profile.title}
              </Text>
            </Stack>

            <HStack spacing={2} flexWrap="wrap">
              {profile.roles.map((role) => (
                <Badge
                  key={role}
                  px={3}
                  py={1.5}
                  borderRadius="md"
                  bg="surface.700"
                  color="gray.200"
                  fontWeight="medium"
                  borderWidth="1px"
                  borderColor="whiteAlpha.100"
                >
                  {role}
                </Badge>
              ))}
            </HStack>

            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400" maxW="2xl">
              {profile.intro}
            </Text>

            <HStack spacing={4} flexWrap="wrap">
              <Button
                as={RouterLink}
                to="/#contact"
                size="lg"
                bgGradient="linear(to-r, brand.500, brand.400)"
                _hover={{ bgGradient: 'linear(to-r, brand.400, brand.300)' }}
              >
                Get in touch
              </Button>
              {cvUrl ? (
                <Button
                  as="a"
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  _hover={{ bg: 'whiteAlpha.100' }}
                >
                  Download CV
                </Button>
              ) : (
                <Button
                  as="a"
                  href={`mailto:${profile.email}`}
                  size="lg"
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  _hover={{ bg: 'whiteAlpha.100' }}
                >
                  Email me
                </Button>
              )}
              <Button
                as="a"
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="ghost"
                color="gray.300"
              >
                GitHub →
              </Button>
            </HStack>
          </Stack>

          <SimpleGrid columns={2} spacing={4} minW={{ lg: '360px' }} w={{ lg: '360px' }}>
            {profile.stats.map((stat) => (
              <Box
                key={stat.label}
                p={5}
                borderRadius="2xl"
                bg="surface.800"
                borderWidth="1px"
                borderColor="whiteAlpha.100"
                backdropFilter="blur(8px)"
              >
                <Text
                  fontSize="2xl"
                  fontWeight="800"
                  bgGradient="linear(to-r, brand.300, accent.400)"
                  bgClip="text"
                >
                  {stat.value}
                </Text>
                <Text fontSize="sm" color="gray.400" mt={1}>
                  {stat.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Flex>
      </Container>
    </Box>
  )
}
