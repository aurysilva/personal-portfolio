import { useMemo } from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { SkillsCategoryTabs } from '@/components/skills/SkillsCategoryTabs'
import { useProfile } from '@/context/ProfileContext'
import {
  computeSkillStats,
  groupSkills,
  shortSkillName,
} from '@/lib/skills'
import { sectionPy } from '@/theme'

export function SkillsSection() {
  const { profile } = useProfile()

  const groups = useMemo(() => groupSkills(profile.skills), [profile.skills])
  const stats = useMemo(() => computeSkillStats(profile.skills), [profile.skills])

  return (
    <Box
      as="section"
      id="skills"
      py={sectionPy}
      bg="surface.800"
      position="relative"
      overflow="hidden"
    >
      <SkillsSectionBackdrop />

      <Container maxW="container.xl" position="relative">
        <Stack spacing={{ base: 10, md: 14 }}>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap={{ base: 8, lg: 12 }}
            align={{ base: 'flex-start', lg: 'flex-end' }}
            justify="space-between"
          >
            <Flex gap={{ base: 6, md: 10 }} align="flex-start" flex="1">
              <Text
                fontSize={{ base: '5xl', md: '7xl' }}
                fontWeight="800"
                lineHeight="1"
                bgGradient="linear(to-b, brand.300, brand.700)"
                bgClip="text"
                fontFamily="mono"
                flexShrink={0}
              >
                02
              </Text>

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
                  Tools and technologies acquired across agency, freelance, and product work —
                  grouped by discipline so you can scan what matters.
                </Text>
              </Stack>
            </Flex>

            {stats && (
              <SimpleGrid columns={3} spacing={3} minW={{ md: '320px' }} flexShrink={0}>
                <StatPill value={`${stats.count}`} label="Skills" />
                <StatPill value={`${stats.average}%`} label="Avg. level" />
                <StatPill
                  value={`${stats.top.level}%`}
                  label="Top skill"
                  hint={shortSkillName(stats.top.name)}
                />
              </SimpleGrid>
            )}
          </Flex>

          <SkillsCategoryTabs groups={groups} />
        </Stack>
      </Container>
    </Box>
  )
}

function SkillsSectionBackdrop() {
  return (
    <>
      <Box
        position="absolute"
        top="10%"
        left="-8%"
        w="360px"
        h="360px"
        borderRadius="full"
        bg="brand.500"
        opacity={0.07}
        filter="blur(90px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-5%"
        right="-5%"
        w="420px"
        h="420px"
        borderRadius="full"
        bg="accent.500"
        opacity={0.05}
        filter="blur(90px)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        inset={0}
        opacity={0.35}
        bgImage="linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)"
        bgSize="48px 48px"
        pointerEvents="none"
      />
    </>
  )
}

function StatPill({
  value,
  label,
  hint,
}: {
  value: string
  label: string
  hint?: string
}) {
  return (
    <Box
      p={4}
      borderRadius="xl"
      bg="surface.900"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      textAlign="center"
    >
      <Text
        fontSize="xl"
        fontWeight="800"
        lineHeight="1"
        bgGradient="linear(to-r, brand.300, accent.300)"
        bgClip="text"
      >
        {value}
      </Text>
      <Text fontSize="xs" color="gray.500" mt={1.5} textTransform="uppercase" letterSpacing="wider">
        {label}
      </Text>
      {hint && (
        <Text fontSize="10px" color="gray.600" mt={1} noOfLines={1}>
          {hint}
        </Text>
      )}
    </Box>
  )
}
