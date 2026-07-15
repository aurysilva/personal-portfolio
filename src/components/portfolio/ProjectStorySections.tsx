import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
} from '@chakra-ui/react'
import type { ProjectStorySection } from '@/lib/content'
import { ProjectStoryContent } from '@/components/content/ProjectStoryContent'

interface ProjectStorySectionsProps {
  sections: ProjectStorySection[]
}

export function ProjectStorySections({ sections }: ProjectStorySectionsProps) {
  return (
    <Stack spacing={{ base: 16, md: 24 }}>
      {sections.map((section) => (
        <Box key={section.number} as="section">
          <Container maxW="container.lg">
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={{ base: 4, md: 10 }}
              align="flex-start"
            >
              <Box flexShrink={0} minW={{ md: '100px' }}>
                <Heading
                  as="span"
                  fontSize={{ base: '5xl', md: '6xl' }}
                  fontWeight="800"
                  lineHeight="1"
                  bgGradient="linear(to-b, brand.300, brand.600)"
                  bgClip="text"
                  fontFamily="mono"
                >
                  {section.number}
                </Heading>
              </Box>

              <Stack spacing={6} flex="1" minW={0}>
                <Heading
                  as="h2"
                  size={{ base: 'lg', md: 'xl' }}
                  fontWeight="700"
                  letterSpacing="-0.02em"
                >
                  {section.title}
                </Heading>
                <ProjectStoryContent html={section.html} />
              </Stack>
            </Flex>
          </Container>
        </Box>
      ))}
    </Stack>
  )
}
