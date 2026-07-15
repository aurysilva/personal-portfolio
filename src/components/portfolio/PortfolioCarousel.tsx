import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { PortfolioCard } from '@/components/content/PortfolioCard'
import { ViewAllPortfolioCard } from '@/components/portfolio/ViewAllPortfolioCard'
import type { WpPortfolio } from '@/lib/wordpress'

const VISIBLE_DESKTOP = 3
const VISIBLE_MOBILE = 1
const MAX_ITEMS = 8
const VIEW_ALL_KEY = 'view-all'

interface PortfolioCarouselProps {
  items: WpPortfolio[]
  autoPlayMs?: number
}

export function PortfolioCarousel({ items, autoPlayMs = 8000 }: PortfolioCarouselProps) {
  const portfolioItems = useMemo(() => items.slice(0, MAX_ITEMS), [items])
  const trackLength = portfolioItems.length + 1

  const visibleCount = useBreakpointValue({ base: VISIBLE_MOBILE, md: VISIBLE_DESKTOP }) ?? VISIBLE_DESKTOP
  const maxIndex = Math.max(0, trackLength - visibleCount)

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex))
  }, [maxIndex])

  const goTo = useCallback(
    (next: number) => {
      if (maxIndex === 0) return
      setIndex(Math.max(0, Math.min(next, maxIndex)))
    },
    [maxIndex],
  )

  const next = useCallback(() => {
    setIndex((current) => (current >= maxIndex ? 0 : current + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setIndex((current) => (current <= 0 ? maxIndex : current - 1))
  }, [maxIndex])

  useEffect(() => {
    if (maxIndex === 0 || paused) return
    const timer = window.setInterval(next, autoPlayMs)
    return () => window.clearInterval(timer)
  }, [next, maxIndex, autoPlayMs, paused])

  if (portfolioItems.length === 0) return null

  const itemWidthPercent = 100 / trackLength
  const trackWidthPercent = (trackLength / visibleCount) * 100

  const trackItems: Array<WpPortfolio | typeof VIEW_ALL_KEY> = [
    ...portfolioItems,
    VIEW_ALL_KEY,
  ]

  return (
    <Box
      position="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Box overflow="hidden" position="relative" w="100%" py={2}>
        <motion.div
          style={{
            display: 'flex',
            width: `${trackWidthPercent}%`,
          }}
          animate={{ x: `-${index * itemWidthPercent}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {trackItems.map((entry) => (
            <Box
              key={entry === VIEW_ALL_KEY ? VIEW_ALL_KEY : entry.id}
              flex={`0 0 ${itemWidthPercent}%`}
              px={2}
              minW={0}
            >
              {entry === VIEW_ALL_KEY ? (
                <ViewAllPortfolioCard />
              ) : (
                <PortfolioCard item={entry} compact />
              )}
            </Box>
          ))}
        </motion.div>
      </Box>

      {maxIndex > 0 && (
        <Flex mt={8} align="center" justify="space-between" gap={4}>
          <HStack spacing={2}>
            <IconButton
              aria-label="Previous project"
              icon={<Text fontSize="lg">←</Text>}
              onClick={prev}
              variant="outline"
              borderColor="whiteAlpha.300"
              borderRadius="full"
            />
            <IconButton
              aria-label="Next project"
              icon={<Text fontSize="lg">→</Text>}
              onClick={next}
              variant="outline"
              borderColor="whiteAlpha.300"
              borderRadius="full"
            />
          </HStack>

          <HStack spacing={2} flexWrap="wrap" justify="center">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <Box
                key={i}
                as="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                w={i === index ? '24px' : '8px'}
                h="8px"
                borderRadius="full"
                bg={i === index ? 'brand.400' : 'whiteAlpha.300'}
                transition="all 0.3s"
                cursor="pointer"
              />
            ))}
          </HStack>

          <Text fontSize="sm" color="gray.500" fontFamily="mono" flexShrink={0}>
            {String(index + 1).padStart(2, '0')} / {String(maxIndex + 1).padStart(2, '0')}
          </Text>
        </Flex>
      )}
    </Box>
  )
}
