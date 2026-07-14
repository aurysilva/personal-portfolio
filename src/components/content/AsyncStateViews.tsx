import { Box, Spinner, Stack, Text } from '@chakra-ui/react'

interface LoadingStateProps {
  label?: string
}

export function LoadingState({ label = 'Loading content…' }: LoadingStateProps) {
  return (
    <Stack align="center" justify="center" minH="40vh" spacing={4}>
      <Spinner size="lg" color="brand.500" thickness="3px" />
      <Text color="gray.500">{label}</Text>
    </Stack>
  )
}

interface ErrorStateProps {
  title?: string
  message: string
}

export function ErrorState({
  title = 'Something went wrong',
  message,
}: ErrorStateProps) {
  return (
    <Box
      borderWidth="1px"
      borderColor="red.200"
      bg="red.50"
      _dark={{ bg: 'red.900', borderColor: 'red.700' }}
      borderRadius="lg"
      p={6}
      my={8}
    >
      <Text fontWeight="semibold" mb={2}>
        {title}
      </Text>
      <Text color="gray.600" _dark={{ color: 'gray.300' }}>
        {message}
      </Text>
    </Box>
  )
}
