import {
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { useProfile } from '@/context/ProfileContext'
import { profileFallback } from '@/data/profile'
import { sectionPy } from '@/theme'

export function AboutSection() {
  const { profile } = useProfile()
  const paragraphs = profile.about.split('\n\n').filter(Boolean)
  const [lead, ...body] = paragraphs
  const profileImage = profile.profileImage ?? profileFallback.profileImage

  return (
    <Box as="section" id="about" py={sectionPy} position="relative" overflow="hidden">
      <Box
        position="absolute"
        top="20%"
        right="-10%"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="brand.500"
        opacity={0.05}
        filter="blur(80px)"
        pointerEvents="none"
      />

      <Container maxW="container.xl" position="relative">
        <Stack spacing={{ base: 10, md: 14 }}>
          <Grid
            templateColumns={{ base: '1fr', lg: '340px 1fr' }}
            gap={{ base: 8, lg: 12 }}
            alignItems="start"
          >
            <GridItem>
              <Stack spacing={6} position={{ lg: 'sticky' }} top={{ lg: '96px' }}>
                <Box
                  borderRadius="2xl"
                  overflow="hidden"
                  borderWidth="1px"
                  borderColor="whiteAlpha.100"
                  bg="surface.800"
                  role="group"
                >
                  <Box position="relative" overflow="hidden">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt={profile.name}
                        w="100%"
                        h={{ base: '280px', lg: '320px' }}
                        objectFit="cover"
                        objectPosition="center 15%"
                        transition="transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
                        _groupHover={{ transform: 'scale(1.04)' }}
                      />
                    ) : (
                      <Flex
                        h={{ base: '280px', lg: '320px' }}
                        bg="surface.700"
                        align="center"
                        justify="center"
                      >
                        <Text fontSize="5xl" fontWeight="800" color="whiteAlpha.200">
                          {profile.name.charAt(0)}
                        </Text>
                      </Flex>
                    )}
                    <Box
                      position="absolute"
                      inset={0}
                      bgGradient="linear(to-t, surface.900 0%, transparent 50%)"
                    />
                    <Badge
                      position="absolute"
                      top={3}
                      left={3}
                      px={2.5}
                      py={1}
                      borderRadius="full"
                      bg={profile.available ? 'green.500' : 'gray.500'}
                      color="white"
                      fontSize="10px"
                      fontWeight="bold"
                      textTransform="uppercase"
                      letterSpacing="wider"
                    >
                      {profile.available ? 'Open to work' : 'Unavailable'}
                    </Badge>
                  </Box>

                  <Stack p={5} spacing={2}>
                    <Text fontFamily="mono" fontSize="xs" color="brand.400">
                      01 — Who am I?
                    </Text>
                    <Text fontWeight="800" fontSize="xl" color="white">
                      {profile.name}
                    </Text>
                    <Text fontSize="sm" color="brand.300">
                      {profile.title}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {profile.location}
                    </Text>
                  </Stack>
                </Box>

                <Box
                  p={5}
                  borderRadius="2xl"
                  bg="surface.800"
                  borderWidth="1px"
                  borderColor="whiteAlpha.100"
                >
                  <Text
                    fontSize="xs"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    color="gray.500"
                    mb={4}
                  >
                    Focus areas
                  </Text>
                  <Wrap spacing={2}>
                    {profile.roles.map((role) => (
                      <WrapItem key={role}>
                        <Text
                          fontSize="xs"
                          fontWeight="600"
                          px={3}
                          py={1.5}
                          borderRadius="full"
                          bg="surface.700"
                          borderWidth="1px"
                          borderColor="whiteAlpha.100"
                          color="gray.200"
                        >
                          {role}
                        </Text>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
              </Stack>
            </GridItem>

            <GridItem>
              <Stack spacing={{ base: 8, md: 10 }}>
                <Stack spacing={4}>
                  <Heading
                    size={{ base: 'xl', md: '2xl' }}
                    fontWeight="800"
                    letterSpacing="-0.02em"
                    lineHeight="shorter"
                    maxW="3xl"
                  >
                    Building digital experiences that blend design &amp; engineering
                  </Heading>

                  {lead && (
                    <Text
                      color="gray.300"
                      fontSize={{ base: 'md', md: 'lg' }}
                      lineHeight="1.9"
                      maxW="3xl"
                    >
                      {lead}
                    </Text>
                  )}
                </Stack>

                <SimpleGrid columns={{ base: 2, sm: 4 }} spacing={3}>
                  {profile.stats.map((stat) => (
                    <Box
                      key={stat.label}
                      p={4}
                      borderRadius="xl"
                      bg="surface.800"
                      borderWidth="1px"
                      borderColor="whiteAlpha.100"
                      transition="all 0.25s ease"
                      _hover={{ borderColor: 'brand.600' }}
                    >
                      <Text
                        fontSize="2xl"
                        fontWeight="800"
                        lineHeight="1"
                        bgGradient="linear(to-r, brand.300, accent.300)"
                        bgClip="text"
                      >
                        {stat.value}
                      </Text>
                      <Text fontSize="xs" color="gray.500" mt={2} lineHeight="short">
                        {stat.label}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>

                {body.length > 0 && (
                  <Stack spacing={5}>
                    {body.map((paragraph) => (
                      <Text
                        key={paragraph.slice(0, 48)}
                        color="gray.400"
                        lineHeight="1.9"
                        fontSize="md"
                      >
                        {paragraph}
                      </Text>
                    ))}
                  </Stack>
                )}

                <Box
                  p={{ base: 5, md: 6 }}
                  borderRadius="2xl"
                  bg="surface.800"
                  borderWidth="1px"
                  borderColor="whiteAlpha.100"
                  position="relative"
                  overflow="hidden"
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    w="3px"
                    h="100%"
                    bgGradient="linear(to-b, brand.400, accent.400)"
                  />
                  <Stack spacing={4} pl={2}>
                    <Text
                      fontSize="xs"
                      fontWeight="semibold"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      color="brand.400"
                    >
                      What I bring
                    </Text>
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
                      {profile.highlights.map((item, index) => (
                        <HStack key={item} align="flex-start" spacing={3}>
                          <Flex
                            boxSize={7}
                            borderRadius="md"
                            bg="brand.900"
                            borderWidth="1px"
                            borderColor="brand.700"
                            align="center"
                            justify="center"
                            flexShrink={0}
                          >
                            <Text fontFamily="mono" fontSize="10px" fontWeight="bold" color="brand.300">
                              {String(index + 1).padStart(2, '0')}
                            </Text>
                          </Flex>
                          <Text color="gray.300" fontSize="sm" lineHeight="tall" pt={0.5}>
                            {item}
                          </Text>
                        </HStack>
                      ))}
                    </SimpleGrid>
                  </Stack>
                </Box>
              </Stack>
            </GridItem>
          </Grid>
        </Stack>
      </Container>
    </Box>
  )
}
