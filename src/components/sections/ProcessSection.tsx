import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useProfile } from '@/context/ProfileContext'
import { sectionPy } from '@/theme'

export function ProcessSection() {
  const { profile } = useProfile()

  return (
    <Box as="section" id="process" py={sectionPy} bg="surface.800">
      <Container maxW="container.xl">
        <Stack spacing={{ base: 12, md: 16 }}>
          <Stack spacing={4} textAlign="center" maxW="2xl" mx="auto">
            <Text
              fontSize="sm"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
              color="brand.400"
            >
              Working Process
            </Text>
            <Heading size={{ base: 'xl', md: '2xl' }} fontWeight="800" letterSpacing="-0.02em">
              How I work remotely
            </Heading>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={0}>
            {profile.process.map((item, index) => (
              <Box
                key={item.step}
                p={{ base: 8, md: 10 }}
                borderWidth="1px"
                borderColor="whiteAlpha.100"
                borderLeftWidth={{ md: index === 0 ? '1px' : 0 }}
                position="relative"
              >
                <Stack spacing={5}>
                  <Text
                    fontSize={{ base: '4xl', md: '5xl' }}
                    fontWeight="800"
                    bgGradient="linear(to-b, brand.300, brand.600)"
                    bgClip="text"
                    fontFamily="mono"
                    lineHeight="1"
                  >
                    {item.step}
                  </Text>
                  <Stack spacing={2}>
                    <Text fontSize="lg" fontWeight="700">
                      {item.title}
                    </Text>
                    <Text color="gray.400" fontSize="sm" lineHeight="tall">
                      {item.description}
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  )
}
