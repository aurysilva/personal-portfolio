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

const featuredSkills = profile.skills.slice(0, 6)

export function SkillsSection() {
  return (
    <Box as="section" id="skills" py={sectionPy} bg="surface.800">
      <Container maxW="container.xl">
        <Stack spacing={{ base: 12, md: 16 }}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 6, md: 16 }}
            align={{ base: 'flex-start', md: 'flex-end' }}
            justify="space-between"
          >
            <Stack spacing={4} maxW="2xl">
              <Text
                fontSize="sm"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider"
                color="brand.400"
              >
                02 — Expertise
              </Text>
              <Heading
                size={{ base: 'xl', md: '2xl' }}
                fontWeight="800"
                letterSpacing="-0.02em"
                lineHeight="shorter"
              >
                The best digital solutions
              </Heading>
              <Text color="gray.400" fontSize="lg">
                Tools and technologies acquired across agency, freelance, and product work.
              </Text>
            </Stack>
            <Text
              fontSize={{ base: '5xl', md: '6xl' }}
              fontWeight="800"
              color="whiteAlpha.100"
              lineHeight="1"
              fontFamily="mono"
              flexShrink={0}
            >
              {profile.skills.length}+
            </Text>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            {featuredSkills.map((skill, index) => (
              <Box
                key={skill.name}
                p={6}
                borderRadius="2xl"
                bg="surface.700"
                borderWidth="1px"
                borderColor="whiteAlpha.100"
                transition="all 0.25s ease"
                _hover={{
                  borderColor: 'brand.600',
                  transform: 'translateY(-4px)',
                  shadow: '0 16px 32px rgba(6,182,212,0.08)',
                }}
              >
                <Stack spacing={4}>
                  <Text fontFamily="mono" fontSize="xs" color="brand.400">
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                  <Text fontWeight="700" fontSize="md" color="white">
                    {skill.name}
                  </Text>
                  <Box h="2px" w="100%" bg="surface.600" borderRadius="full" overflow="hidden">
                    <Box
                      h="100%"
                      w={`${skill.level}%`}
                      bgGradient="linear(to-r, brand.500, accent.400)"
                      borderRadius="full"
                    />
                  </Box>
                  <Text fontSize="sm" color="gray.500" fontFamily="mono">
                    {skill.level}% proficiency
                  </Text>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  )
}
