import {
  Box,
  Flex,
  Text,
} from '@chakra-ui/react'

interface MarqueeStripProps {
  items: readonly string[]
}

export function MarqueeStrip({ items }: MarqueeStripProps) {
  const track = [...items, ...items]

  return (
    <Box
      overflow="hidden"
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderColor="whiteAlpha.100"
      bg="surface.800"
      py={4}
    >
      <Flex
        animation="marquee 30s linear infinite"
        w="max-content"
        gap={12}
      >
        {track.map((item, i) => (
          <Flex key={`${item}-${i}`} align="center" gap={12} flexShrink={0}>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight="600"
              color="gray.400"
              whiteSpace="nowrap"
              letterSpacing="-0.01em"
            >
              {item}
            </Text>
            <Box boxSize={2} borderRadius="full" bg="brand.400" flexShrink={0} />
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}
