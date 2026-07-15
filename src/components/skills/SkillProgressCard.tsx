import { motion } from 'framer-motion'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { proficiencyLabel } from '@/lib/skills'

const TRACK_COLOR = 'rgba(214, 217, 246, 0.18)'
const FILL_COLOR = 'brand.200'
const THUMB_COLOR = 'accent.400'
const FILL_HEX = '#99f6e4'

interface SkillProgressCardProps {
  index: number
  name: string
  level: number
}

export function SkillProgressCard({ index, name, level }: SkillProgressCardProps) {
  const label = proficiencyLabel(level)

  return (
    <Box
      role="group"
      p={{ base: 5, md: 6 }}
      borderRadius="2xl"
      bg="surface.900"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      transition="all 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
      _hover={{
        borderColor: 'brand.600',
        transform: 'translateY(-4px)',
        shadow: '0 16px 40px rgba(6, 182, 212, 0.1)',
      }}
      h="100%"
    >
      <Stack spacing={4}>
        <Flex justify="space-between" align="flex-start" gap={3}>
          <Flex align="center" gap={3} minW={0}>
            <Text
              fontFamily="mono"
              fontSize="xs"
              fontWeight="bold"
              color="brand.500"
              flexShrink={0}
            >
              {String(index).padStart(2, '0')}
            </Text>
            <Text fontWeight="700" fontSize="sm" color="white" lineHeight="short" noOfLines={2}>
              {name}
            </Text>
          </Flex>
          <Stack spacing={0} align="flex-end" flexShrink={0}>
            <Text fontWeight="800" fontSize="lg" color="white" lineHeight="1">
              {level}%
            </Text>
            <Text fontSize="10px" color="brand.400" fontWeight="semibold" textTransform="uppercase">
              {label}
            </Text>
          </Stack>
        </Flex>

        <Box position="relative" h="6px" borderRadius="full" bg={TRACK_COLOR}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: index * 0.02 }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              minWidth: level > 0 ? 10 : 0,
              borderRadius: 9999,
              backgroundColor: FILL_HEX,
            }}
          >
            <Box
              position="absolute"
              right={0}
              top="50%"
              transform="translate(50%, -50%)"
              boxSize="11px"
              borderRadius="full"
              bg={THUMB_COLOR}
              borderWidth="2px"
              borderColor={FILL_COLOR}
              boxShadow="0 0 10px rgba(245, 158, 11, 0.45)"
            />
          </motion.div>
        </Box>
      </Stack>
    </Box>
  )
}
