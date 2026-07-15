import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { profile } from '@/data/profile'
import { sectionPy } from '@/theme'

export function ExperienceSection() {
  return (
    <Box as="section" id="experience" py={sectionPy}>
      <Container maxW="container.xl">
        <Stack spacing={{ base: 12, md: 16 }}>
          <Stack spacing={4} maxW="2xl">
            <Text
              fontSize="sm"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
              color="brand.400"
            >
              04 — Journey
            </Text>
            <Heading size={{ base: 'xl', md: '2xl' }} fontWeight="800" letterSpacing="-0.02em">
              Qualifications &amp; experience
            </Heading>
            <Text color="gray.400">
              Permanent roles, freelance work, and sometimes two jobs at once.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 10, lg: 16 }}>
            <Stack spacing={6}>
              <Text fontSize="xs" fontWeight="semibold" textTransform="uppercase" letterSpacing="wider" color="gray.500">
                Education
              </Text>
              {profile.qualifications.map((item, index) => (
                <ExperienceRow
                  key={item.title}
                  index={index + 1}
                  org={item.org}
                  title={item.title}
                  period={item.period}
                />
              ))}
            </Stack>

            <Stack spacing={6}>
              <Text fontSize="xs" fontWeight="semibold" textTransform="uppercase" letterSpacing="wider" color="gray.500">
                Work Experience
              </Text>
              {profile.experience.map((item, index) => (
                <ExperienceRow
                  key={item.org}
                  index={index + 1}
                  org={item.org}
                  title={item.role}
                  period={item.period}
                  accent
                />
              ))}
            </Stack>
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  )
}

function ExperienceRow({
  index,
  org,
  title,
  period,
  accent,
}: {
  index: number
  org: string
  title: string
  period: string
  accent?: boolean
}) {
  return (
    <Flex
      gap={5}
      p={5}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      bg="surface.800"
      transition="border-color 0.2s"
      _hover={{ borderColor: accent ? 'accent.600' : 'brand.600' }}
    >
      <Text
        fontFamily="mono"
        fontSize="sm"
        fontWeight="700"
        color={accent ? 'accent.400' : 'brand.400'}
        flexShrink={0}
        pt={0.5}
      >
        {String(index).padStart(2, '0')}
      </Text>
      <Stack spacing={1} flex="1">
        <Text fontWeight="700">{org}</Text>
        <Text color="gray.300" fontSize="sm">{title}</Text>
        <Text fontSize="xs" color="gray.500">{period}</Text>
      </Stack>
    </Flex>
  )
}
