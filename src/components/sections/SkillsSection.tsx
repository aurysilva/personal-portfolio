import {
  Box,
  Container,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { profile } from '@/data/profile'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { sectionPy } from '@/theme'

export function SkillsSection() {
  return (
    <Box as="section" id="skills" py={sectionPy}>
      <Container>
        <Stack spacing={12}>
          <SectionHeading
            eyebrow="Why hire me?"
            title="Where I thrive the most"
            description="Programming languages, tools, and skills acquired across agency, freelance, and product work."
            align="center"
          />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {profile.skills.map((skill) => (
              <Box
                key={skill.name}
                p={5}
                borderRadius="xl"
                bg="surface.800"
                borderWidth="1px"
                borderColor="whiteAlpha.100"
              >
                <Stack spacing={3}>
                  <Box display="flex" justifyContent="space-between" gap={4}>
                    <Text fontWeight="medium" fontSize="sm">
                      {skill.name}
                    </Text>
                    <Text fontSize="sm" color="brand.300" fontFamily="mono">
                      {skill.level}%
                    </Text>
                  </Box>
                  <Progress
                    value={skill.level}
                    size="sm"
                    borderRadius="full"
                    bg="surface.600"
                    sx={{
                      '& > div': {
                        background: 'linear-gradient(90deg, #0891b2, #22d3ee, #fbbf24)',
                      },
                    }}
                  />
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  )
}
