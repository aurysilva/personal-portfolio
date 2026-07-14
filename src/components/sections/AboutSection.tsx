import type { ReactNode } from 'react'
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { profile } from '@/data/profile'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { sectionPy } from '@/theme'

export function AboutSection() {
  return (
    <Box as="section" id="about" py={sectionPy} bg="surface.800">
      <Container>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 10, lg: 16 }}>
          <SectionHeading
            eyebrow="Who am I?"
            title="About me"
            description="Full-stack developer bridging creative design and robust engineering."
          />

          <Stack spacing={6}>
            {profile.about.split('\n\n').map((paragraph) => (
              <Text key={paragraph.slice(0, 40)} color="gray.300" lineHeight="tall">
                {paragraph}
              </Text>
            ))}

            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3} pt={2}>
              {profile.highlights.map((item) => (
                <HStackItem key={item} label={item} />
              ))}
            </SimpleGrid>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

function HStackItem({ label }: { label: string }) {
  return (
    <HStackRow>
      <Box
        mt={2}
        boxSize={2}
        borderRadius="full"
        bg="brand.400"
        flexShrink={0}
      />
      <Text color="gray.300">{label}</Text>
    </HStackRow>
  )
}

function HStackRow({ children }: { children: ReactNode }) {
  return (
    <Box display="flex" gap={3} alignItems="flex-start">
      {children}
    </Box>
  )
}
