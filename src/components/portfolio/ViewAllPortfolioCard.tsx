import {
  Box,
  Button,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export function ViewAllPortfolioCard() {
  return (
    <Box
      as="article"
      borderRadius="2xl"
      overflow="hidden"
      bg="surface.800"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      h="100%"
      minH="280px"
      display="flex"
      flexDirection="column"
      position="relative"
      transition="all 0.25s ease"
      _hover={{
        transform: 'translateY(-6px)',
        borderColor: 'brand.500',
        shadow: '0 20px 40px rgba(6, 182, 212, 0.12)',
      }}
    >
      <Box
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
        bg="surface.700"
        minH="180px"
      >
        <Box
          position="absolute"
          inset={0}
          bgGradient="radial(circle at 30% 30%, rgba(6,182,212,0.25), transparent 60%), radial(circle at 70% 70%, rgba(245,158,11,0.15), transparent 50%)"
        />
        <Text
          fontSize="6xl"
          fontWeight="800"
          color="whiteAlpha.100"
          position="absolute"
          userSelect="none"
          aria-hidden
        >
          +
        </Text>
        <Stack spacing={2} align="center" position="relative" px={6} textAlign="center">
          <Text
            fontSize="xs"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wider"
            color="brand.400"
          >
            Portfolio
          </Text>
          <Text fontWeight="700" fontSize="lg" color="white">
            Explore all projects
          </Text>
        </Stack>
      </Box>

      <Stack p={5} spacing={4} align="center">
        <Text fontSize="sm" color="gray.500" textAlign="center">
          React apps, emails, landing pages &amp; more
        </Text>
        <Button
          as={RouterLink}
          to="/portfolio"
          w="100%"
          bgGradient="linear(to-r, brand.500, brand.400)"
          _hover={{ bgGradient: 'linear(to-r, brand.400, brand.300)' }}
        >
          View all
        </Button>
      </Stack>
    </Box>
  )
}
