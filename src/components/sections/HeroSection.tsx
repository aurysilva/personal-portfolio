import { motion } from 'framer-motion'
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useProfile } from '@/context/ProfileContext'
import { profileFallback } from '@/data/profile'
import heroVideo from '@/assets/videos/video-coding-sample.mp4'

const cvUrl = import.meta.env.VITE_CV_URL

function getHeroHighlightStats(
  stats: Array<{ value: string; label: string }>,
): Array<{ value: string; label: string }> {
  const byPattern = (pattern: RegExp) =>
    stats.find((stat) => pattern.test(stat.label) || pattern.test(stat.value))

  const years = byPattern(/years/i)
  const agency = byPattern(/agency|b2b/i)

  return [
    { value: 'BA', label: 'BA Digital Design' },
    {
      value: years?.value ?? '10+',
      label: years?.label ?? 'Years Dev Experience',
    },
    {
      value: agency?.value ?? 'B2B & B2C',
      label: agency?.label ?? 'Agency Experience',
    },
    { value: 'Available', label: '' },
  ]
}

function HeroHighlightGrid({
  stats,
}: {
  stats: Array<{ value: string; label: string }>
}) {
  return (
    <SimpleGrid
      columns={2}
      spacing={4}
      w={{ base: '100%', sm: '340px', lg: '400px' }}
      mx="auto"
    >
      {stats.map((stat) => (
        <Box
          key={stat.value}
          p={{ base: 4, md: 5 }}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={stat.value === 'Available' ? 'green.700' : 'whiteAlpha.200'}
          bg={stat.value === 'Available' ? 'green.900' : 'whiteAlpha.100'}
          backdropFilter="blur(8px)"
          textAlign="center"
          transition="all 0.3s ease"
          _hover={{
            borderColor: stat.value === 'Available' ? 'green.500' : 'brand.400',
            transform: 'translateY(-2px)',
          }}
        >
          <Text
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="800"
            lineHeight="1.1"
            bgGradient={
              stat.value === 'Available'
                ? undefined
                : 'linear(to-r, brand.300, accent.400)'
            }
            bgClip={stat.value === 'Available' ? undefined : 'text'}
            color={stat.value === 'Available' ? 'green.300' : undefined}
          >
            {stat.value}
          </Text>
          {stat.label ? (
            <Text fontSize="xs" color="gray.400" mt={2} lineHeight="short">
              {stat.label}
            </Text>
          ) : null}
        </Box>
      ))}
    </SimpleGrid>
  )
}

interface HeroSectionProps {
  /** When false, hides the profile photo column on the right */
  showPhoto?: boolean
}

export function HeroSection({ showPhoto = true }: HeroSectionProps) {
  const { profile } = useProfile()
  const [imageError, setImageError] = useState(false)
  const profileImage = profile.profileImage ?? profileFallback.profileImage
  const displayPhoto = showPhoto && Boolean(profileImage) && !imageError
  const highlightStats = getHeroHighlightStats(profile.stats)

  return (
    <Box
      as="section"
      id="hero"
      position="relative"
      minH={{ base: '90vh', md: '100vh' }}
      display="flex"
      alignItems="center"
      overflow="hidden"
    >
      <Box position="absolute" inset={0} zIndex={0} overflow="hidden">
        <Box
          as="video"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>

      <Box
        position="absolute"
        inset={0}
        bg="blackAlpha.700"
        zIndex={1}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(circle at 15% 50%, rgba(6,182,212,0.18), transparent 45%), radial(circle at 85% 20%, rgba(245,158,11,0.12), transparent 35%)"
        zIndex={2}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        inset={0}
        opacity={0.2}
        bgImage="linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"
        bgSize="64px 64px"
        zIndex={2}
        pointerEvents="none"
      />

      <Container position="relative" zIndex={3} py={{ base: 16, md: 24 }}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          gap={{ base: 10, lg: 16 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: 1, width: '100%' }}
          >
            <Stack spacing={{ base: 8, md: 10 }}>
              <HStack spacing={4} flexWrap="wrap">
                {profile.available && (
                  <HStack
                    spacing={2}
                    px={3}
                    py={1.5}
                    borderRadius="full"
                    borderWidth="1px"
                    borderColor="green.700"
                    bg="green.900"
                  >
                    <Box boxSize={2} borderRadius="full" bg="green.400" />
                    <Text fontSize="xs" fontWeight="semibold" color="green.300" textTransform="uppercase" letterSpacing="wider">
                      Available for work
                    </Text>
                  </HStack>
                )}
                <Text fontSize="sm" color="gray.400">
                  {profile.location}
                </Text>
              </HStack>

              <Stack spacing={4}>
                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color="brand.400"
                >
                  Hi, I&apos;m {profile.name.split(' ')[0]}
                </Text>
                <Text
                  as="h1"
                  fontSize={{ base: '4xl', sm: '5xl', md: '6xl', lg: '7xl' }}
                  fontWeight="800"
                  lineHeight="0.95"
                  letterSpacing="-0.04em"
                >
                  Creative{' '}
                  <Text
                    as="span"
                    bgGradient="linear(to-r, brand.300, brand.500, accent.400)"
                    bgClip="text"
                  >
                    Digital
                  </Text>
                  <br />
                  Full-stack Developer
                </Text>
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="gray.300"
                  maxW="2xl"
                  lineHeight="tall"
                >
                  {profile.title} crafting web applications and Integrations, email campaigns, landing pages &amp; CMS builds for agencies and brands.
                </Text>
              </Stack>

              <HStack spacing={4} flexWrap="wrap">
                <Button
                  as={RouterLink}
                  to="/#contact"
                  size="lg"
                  px={8}
                  bgGradient="linear(to-r, brand.500, brand.400)"
                  _hover={{ bgGradient: 'linear(to-r, brand.400, brand.300)', transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                >
                  Let&apos;s work together
                </Button>
                <Button
                  as={RouterLink}
                  to="/portfolio"
                  size="lg"
                  variant="outline"
                  borderColor="whiteAlpha.400"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200', transform: 'translateY(-2px)' }}
                  transition="all 0.2s"
                >
                  View portfolio
                </Button>
                {cvUrl ? (
                  <Button
                    as="a"
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    variant="ghost"
                    color="gray.300"
                  >
                    Download CV ↓
                  </Button>
                ) : null}
              </HStack>

              {!displayPhoto ? null : (
              <Flex
                pt={6}
                gap={{ base: 6, md: 10 }}
                flexWrap="wrap"
                borderTopWidth="1px"
                borderColor="whiteAlpha.200"
              >
                {profile.stats.map((stat) => (
                  <Stack key={stat.label} spacing={0}>
                    <Text
                      fontSize={{ base: '2xl', md: '3xl' }}
                      fontWeight="800"
                      bgGradient="linear(to-r, brand.300, accent.400)"
                      bgClip="text"
                      lineHeight="1"
                    >
                      {stat.value}
                    </Text>
                    <Text fontSize="xs" color="gray.400" maxW="120px" mt={1}>
                      {stat.label}
                    </Text>
                  </Stack>
                ))}
              </Flex>
              )}
            </Stack>
          </motion.div>

          {displayPhoto ? (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ flexShrink: 0 }}
          >
            <Box
              position="relative"
              w={{ base: '280px', md: '320px', lg: '380px' }}
              mx="auto"
            >
              <Box
                position="absolute"
                inset={-4}
                borderRadius="3xl"
                bgGradient="linear(135deg, brand.500, accent.500)"
                opacity={0.4}
                filter="blur(20px)"
              />
              <Box
                borderRadius="3xl"
                overflow="hidden"
                borderWidth="2px"
                borderColor="whiteAlpha.300"
                shadow="0 24px 48px rgba(0,0,0,0.5)"
                position="relative"
                _hover={{ transform: 'scale(1.02)', borderColor: 'brand.400' }}
                transition="all 0.4s ease"
              >
                <Image
                  src={profileImage}
                  alt={profile.name}
                  w="100%"
                  objectFit="cover"
                  aspectRatio={3 / 4}
                  onError={() => setImageError(true)}
                />
              </Box>
              <Box
                position="absolute"
                bottom={-4}
                right={-4}
                px={4}
                py={2}
                borderRadius="full"
                bg="surface.800"
                borderWidth="1px"
                borderColor="brand.500"
                shadow="lg"
              >
                <Text fontSize="xs" fontWeight="bold" color="brand.300">
                  {profile.name}
                </Text>
              </Box>
            </Box>
          </motion.div>
          ) : (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ flexShrink: 0, width: '100%', maxWidth: '400px' }}
          >
            <HeroHighlightGrid stats={highlightStats} />
          </motion.div>
          )}
        </Flex>
      </Container>

      <Box
        position="absolute"
        bottom={8}
        left="50%"
        transform="translateX(-50%)"
        zIndex={3}
        display={{ base: 'none', md: 'block' }}
      >
        <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="widest">
          Scroll
        </Text>
        <Box w="1px" h={8} bg="whiteAlpha.400" mx="auto" mt={2} />
      </Box>
    </Box>
  )
}
