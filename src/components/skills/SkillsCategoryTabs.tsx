import {
  Box,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { SkillProgressCard } from '@/components/skills/SkillProgressCard'
import type { SkillGroup } from '@/lib/skills'

interface SkillsCategoryTabsProps {
  groups: SkillGroup[]
  /** Unique skill count for the All tab (avoids double-counting cross-category skills) */
  uniqueSkillCount?: number
}

const tabStyles = {
  _selected: { bg: 'brand.500', color: 'white' },
  fontSize: 'sm',
  fontWeight: 'semibold',
  borderRadius: 'xl',
} as const

export function SkillsCategoryTabs({ groups, uniqueSkillCount }: SkillsCategoryTabsProps) {
  const totalSkills = uniqueSkillCount ?? groups.reduce((sum, group) => sum + group.skills.length, 0)
  const defaultIndex = Math.max(
    0,
    groups.findIndex((group) => group.id === 'frontend'),
  )

  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="brand"
      isLazy
      defaultIndex={defaultIndex}
    >
      <TabList
        flexWrap="wrap"
        gap={2}
        bg="surface.900"
        borderWidth="1px"
        borderColor="whiteAlpha.100"
        borderRadius="2xl"
        p={2}
      >
        {groups.map((group) => (
          <Tab key={group.id} {...tabStyles}>
            {group.label} ({group.skills.length})
          </Tab>
        ))}
        <Tab {...tabStyles}>All ({totalSkills})</Tab>
      </TabList>

      <TabPanels mt={{ base: 6, md: 8 }}>
        {groups.map((group) => (
          <TabPanel key={group.id} px={0}>
            <SkillCategoryBlock group={group} showHeader={false} />
          </TabPanel>
        ))}

        <TabPanel px={0}>
          <Stack spacing={{ base: 8, md: 10 }}>
            {groups.map((group) => (
              <SkillCategoryBlock key={group.id} group={group} />
            ))}
          </Stack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

function SkillCategoryBlock({
  group,
  showHeader = true,
}: {
  group: SkillGroup
  showHeader?: boolean
}) {
  return (
    <Box>
      {showHeader && (
        <Stack spacing={1} mb={5}>
          <Text fontWeight="700" fontSize="lg" color="white">
            {group.label}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {group.description}
          </Text>
        </Stack>
      )}

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 4, md: 5 }}>
        {group.skills.map((skill, skillIndex) => (
          <SkillProgressCard
            key={skill.name}
            index={skillIndex + 1}
            name={skill.name}
            level={skill.level}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}
