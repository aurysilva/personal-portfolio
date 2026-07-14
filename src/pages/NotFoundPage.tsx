import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { PageMeta } from '@/components/seo/PageMeta'

export function NotFoundPage() {
  return (
    <Container>
      <PageMeta title="Page not found" />
      <Stack spacing={6} py={16} textAlign="center" align="center">
        <Heading size="xl">404</Heading>
        <Text color="gray.600" _dark={{ color: 'gray.300' }}>
          The page you are looking for could not be found.
        </Text>
        <Button as={RouterLink} to="/" colorScheme="brand">
          Go home
        </Button>
      </Stack>
    </Container>
  )
}
