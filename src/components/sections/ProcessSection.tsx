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

export function ProcessSection() {
  return (
    <Box as="section" id="process" py={sectionPy} bg="surface.800">
      <Container>
        <Stack spacing={12}>
          <SectionHeading
            eyebrow="Working process"
            title="My top 3 rules when working remotely"
            align="center"
          />

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {profile.process.map((item) => (
              <Box
                key={item.step}
                p={8}
                borderRadius="2xl"
                bg="surface.700"
                borderWidth="1px"
                borderColor="whiteAlpha.100"
                position="relative"
                overflow="hidden"
              >
                <Text
                  position="absolute"
                  top={4}
                  right={6}
                  fontSize="5xl"
                  fontWeight="800"
                  color="whiteAlpha.100"
                  lineHeight="1"
                >
                  {item.step}
                </Text>
                <Stack spacing={3} position="relative">
                  <Text color="brand.300" fontFamily="mono" fontSize="sm">
                    {item.step}
                  </Text>
                  <Text fontSize="xl" fontWeight="700">
                    {item.title}
                  </Text>
                  <Text color="gray.400">{item.description}</Text>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  )
}
