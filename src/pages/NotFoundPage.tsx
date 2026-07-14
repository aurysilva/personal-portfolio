import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { PageMeta } from '@/components/seo/PageMeta'

export function NotFoundPage() {
  return (
    <Container py={20}>
      <PageMeta title="Page not found" />
      <Stack spacing={6} textAlign="center" align="center">
        <Text fontSize="6xl" fontWeight="800" color="whiteAlpha.200">
          404
        </Text>
        <Heading size="lg">Page not found</Heading>
        <Text color="gray.400">
          The page you are looking for could not be found.
        </Text>
        <Button as={RouterLink} to="/" size="lg">
          Back to home
        </Button>
      </Stack>
    </Container>
  )
}
