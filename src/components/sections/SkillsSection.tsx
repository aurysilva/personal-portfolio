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

const TRACK_COLOR = 'rgba(214, 217, 246, 0.22)'
const FILL_COLOR = 'brand.200'
const THUMB_COLOR = 'accent.400'

export function SkillsSection() {
  return (
    <Box as="section" id="skills" py={sectionPy} bg="surface.800">
      <Container maxW="container.xl">
        <Stack spacing={{ base: 10, md: 14 }}>
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

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 8, md: 10 }}>
            {profile.skills.map((skill) => (
              <SkillProgressItem key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  )
}

function SkillProgressItem({ name, level }: { name: string; level: number }) {
  return (
    <Stack spacing={3}>
      <Flex justify="space-between" align="baseline" gap={4}>
        <Text fontWeight="700" fontSize="md" color="white" lineHeight="short" noOfLines={2}>
          {name}
        </Text>
        <Text fontWeight="700" fontSize="md" color="white" flexShrink={0}>
          {level}%
        </Text>
      </Flex>

      <Box position="relative" h="5px" borderRadius="full" bg={TRACK_COLOR}>
        <Box
          position="absolute"
          left={0}
          top={0}
          h="100%"
          w={`${level}%`}
          minW={level > 0 ? '10px' : 0}
          borderRadius="full"
          bg={FILL_COLOR}
          transition="width 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
        >
          <Box
            position="absolute"
            right={0}
            top="50%"
            transform="translate(50%, -50%)"
            boxSize="10px"
            borderRadius="full"
            bg={THUMB_COLOR}
            borderWidth="2px"
            borderColor={FILL_COLOR}
            boxShadow="0 0 0 1px rgba(245, 158, 11, 0.35)"
          />
        </Box>
      </Box>
    </Stack>
  )
}
