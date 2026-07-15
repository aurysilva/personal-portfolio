import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useProfile } from '@/context/ProfileContext'
import { profileFallback } from '@/data/profile'
import { highlightAboutText } from '@/lib/aboutContent'
import { sectionPy } from '@/theme'

const cvUrl = import.meta.env.VITE_CV_URL

export function AboutSection() {
  const { profile } = useProfile()
  const paragraphs = profile.about.split('\n\n').filter(Boolean)
  const profileImage = profile.profileImage ?? profileFallback.profileImage
  const yearsStat =
    profile.stats.find((stat) => /years/i.test(stat.label)) ?? profile.stats[0]

  return (
    <Box as="section" id="about" py={sectionPy} position="relative" overflow="hidden">
      <Text
        position="absolute"
        bottom={{ base: '-4%', md: '2%' }}
        right={{ base: '-10%', md: '2%' }}
        fontSize={{ base: '8xl', md: '12xl' }}
        fontWeight="800"
        color="whiteAlpha.50"
        lineHeight="1"
        pointerEvents="none"
        userSelect="none"
        aria-hidden
      >
        01
      </Text>

      <Container maxW="container.xl" position="relative">
        <Grid
          templateColumns={{ base: '1fr', lg: 'minmax(280px, 420px) 1fr' }}
          gap={{ base: 10, lg: 16 }}
          alignItems="center"
        >
          <GridItem>
            <Box position="relative" maxW={{ base: '360px', lg: 'none' }} mx={{ base: 'auto', lg: 0 }}>
              <Box
                borderRadius="lg"
                overflow="hidden"
                shadow="0 24px 48px rgba(0, 0, 0, 0.45)"
                bg="surface.800"
              >
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt={profile.name}
                    w="100%"
                    h={{ base: '420px', md: '520px', lg: '560px' }}
                    objectFit="cover"
                    objectPosition="center 12%"
                    filter="grayscale(100%)"
                    transition="filter 0.4s ease"
                    _hover={{ filter: 'grayscale(20%)' }}
                  />
                ) : (
                  <Flex
                    h={{ base: '420px', md: '520px' }}
                    bg="surface.700"
                    align="center"
                    justify="center"
                  >
                    <Text fontSize="6xl" fontWeight="800" color="whiteAlpha.200">
                      {profile.name.charAt(0)}
                    </Text>
                  </Flex>
                )}
              </Box>

              <Box
                position="absolute"
                bottom={{ base: 4, md: 6 }}
                right={{ base: -2, md: -6 }}
                w={{ base: '200px', md: '220px' }}
                bg="surface.800"
                borderWidth="2px"
                borderColor="brand.500"
                borderRadius="lg"
                shadow="0 20px 40px rgba(0, 0, 0, 0.35)"
                overflow="hidden"
              >
                {profile.available && (
                  <Box
                    position="absolute"
                    top="14px"
                    right="-28px"
                    w="120px"
                    py={1}
                    bg="green.500"
                    color="white"
                    fontSize="10px"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    textAlign="center"
                    transform="rotate(45deg)"
                    zIndex={1}
                    boxShadow="md"
                  >
                    Available
                  </Box>
                )}

                <Stack spacing={3} p={5} pt={6} align="center" textAlign="center">
                  <Text
                    fontSize={{ base: '4xl', md: '5xl' }}
                    fontWeight="800"
                    lineHeight="1"
                    color="brand.400"
                    fontFamily="heading"
                  >
                    {yearsStat?.value ?? '10+'}
                  </Text>
                  <Text fontSize="sm" color="gray.300" fontWeight="600" lineHeight="short">
                    Years of experience
                  </Text>

                  {cvUrl && (
                    <Button
                      as="a"
                      href={cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      w="100%"
                      mt={1}
                      leftIcon={<DocumentIcon />}
                      bg="brand.500"
                      color="white"
                      _hover={{ bg: 'brand.400' }}
                      borderRadius="md"
                    >
                      Download CV
                    </Button>
                  )}
                </Stack>
              </Box>
            </Box>
          </GridItem>

          <GridItem>
            <Stack spacing={{ base: 6, md: 8 }} maxW="3xl">
              <Stack spacing={3}>
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color="brand.400"
                  letterSpacing="wide"
                >
                  Who am I?
                </Text>
                <Heading
                  size={{ base: 'xl', md: '2xl' }}
                  fontWeight="800"
                  letterSpacing="-0.02em"
                  lineHeight="shorter"
                >
                  About me
                </Heading>
              </Stack>

              <Stack spacing={5}>
                {paragraphs.map((paragraph) => (
                  <Box
                    key={paragraph.slice(0, 48)}
                    color="gray.400"
                    fontSize={{ base: 'sm', md: 'sm' }}
                    lineHeight="1.9"
                    sx={{
                      strong: {
                        color: 'white',
                        fontWeight: 700,
                      },
                    }}
                    dangerouslySetInnerHTML={{
                      __html: highlightAboutText(paragraph),
                    }}
                  />
                ))}
              </Stack>

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} pt={2}>
                {profile.highlights.map((item) => (
                  <HighlightItem key={item}>{item}</HighlightItem>
                ))}
              </SimpleGrid>
            </Stack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

function HighlightItem({ children }: { children: string }) {
  return (
    <Flex align="flex-start" gap={3}>
      <Flex
        mt={1}
        boxSize={5}
        borderRadius="full"
        bg="brand.900"
        align="center"
        justify="center"
        flexShrink={0}
      >
        <Icon viewBox="0 0 24 24" boxSize={3} color="brand.400">
          <path
            fill="currentColor"
            d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
          />
        </Icon>
      </Flex>
      <Text color="gray.300" fontSize="md" lineHeight="tall">
        {children}
      </Text>
    </Flex>
  )
}

function DocumentIcon() {
  return (
    <Icon viewBox="0 0 24 24" boxSize={4}>
      <path
        fill="currentColor"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2 5 5h-5V4zM8 13h8v2H8v-2zm0 4h8v2H8v-2z"
      />
    </Icon>
  )
}
