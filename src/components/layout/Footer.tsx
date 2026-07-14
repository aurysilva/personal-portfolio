import {
  Box,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useSiteInfo } from '@/lib/wordpress'

export function Footer() {
  const { data: siteInfo } = useSiteInfo()
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as="footer"
      mt="auto"
      borderTopWidth="1px"
      borderColor={borderColor}
      py={10}
    >
      <Container>
        <Stack spacing={2} align="center" textAlign="center">
          <Text fontWeight="semibold">{siteInfo?.name ?? 'Personal Portfolio'}</Text>
          {siteInfo?.description && (
            <Text color="gray.500" maxW="lg">
              {siteInfo.description}
            </Text>
          )}
          <Text fontSize="sm" color="gray.500">
            Content managed in{' '}
            <Link href={siteInfo?.url} isExternal color="brand.500">
              WordPress
            </Link>
            {' · '}
            © {new Date().getFullYear()}
          </Text>
        </Stack>
      </Container>
    </Box>
  )
}
