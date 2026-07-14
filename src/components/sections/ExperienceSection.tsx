import {
  Box,
  Container,
  Divider,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { profile } from '@/data/profile'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { sectionPy } from '@/theme'

export function ExperienceSection() {
  return (
    <Box as="section" id="experience" py={sectionPy} bg="surface.800">
      <Container>
        <Stack spacing={12}>
          <SectionHeading
            eyebrow="Awesome journey"
            title="Qualifications & experience"
            description="Within my permanent roles listed below, I also worked as a freelancer and sometimes held two jobs at once — one permanent and one temporary."
            align="center"
          />

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
            <Stack spacing={4}>
              <Text fontSize="lg" fontWeight="700" color="brand.300">
                Qualifications
              </Text>
              {profile.qualifications.map((item, index) => (
                <TimelineItem
                  key={item.title}
                  {...item}
                  isLast={index === profile.qualifications.length - 1}
                />
              ))}
            </Stack>

            <Stack spacing={4}>
              <Text fontSize="lg" fontWeight="700" color="accent.400">
                Experience
              </Text>
              {profile.experience.map((item, index) => (
                <TimelineItem
                  key={item.org}
                  org={item.org}
                  title={item.role}
                  period={item.period}
                  isLast={index === profile.experience.length - 1}
                />
              ))}
            </Stack>
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  )
}

function TimelineItem({
  org,
  title,
  period,
  isLast,
}: {
  org: string
  title: string
  period: string
  isLast?: boolean
}) {
  return (
    <Box display="flex" gap={4}>
      <Stack align="center" spacing={0}>
        <Box boxSize={3} borderRadius="full" bg="brand.400" mt={2} />
        {!isLast && <Box w="1px" flex="1" bg="whiteAlpha.200" minH="60px" />}
      </Stack>
      <Stack spacing={1} pb={isLast ? 0 : 4} flex="1">
        <Text fontWeight="700">{org}</Text>
        <Text color="gray.300">{title}</Text>
        <Text fontSize="sm" color="gray.500">
          {period}
        </Text>
        {!isLast && <Divider borderColor="whiteAlpha.100" mt={3} />}
      </Stack>
    </Box>
  )
}
