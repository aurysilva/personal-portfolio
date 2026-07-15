import {
  Box,
  Container,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useProfile } from '@/context/ProfileContext'
import { useSiteInfo } from '@/lib/wordpress'

export function Footer() {
  const { profile } = useProfile()
  const { data: siteInfo } = useSiteInfo()
  const year = new Date().getFullYear()

  return (
    <Box
      as="footer"
      mt="auto"
      borderTopWidth="1px"
      borderColor="whiteAlpha.100"
      py={10}
      bg="surface.900"
    >
      <Container>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          spacing={6}
        >
          <Stack spacing={1}>
            <Text fontWeight="700">{siteInfo?.name ?? profile.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {siteInfo?.description ?? profile.title} · {profile.location}
            </Text>
          </Stack>

          <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} fontSize="sm" flexWrap="wrap">
            <Link as={RouterLink} to="/#about" color="gray.400" _hover={{ color: 'brand.300' }}>
              About
            </Link>
            <Link as={RouterLink} to="/portfolio" color="gray.400" _hover={{ color: 'brand.300' }}>
              Portfolio
            </Link>
            <Link as={RouterLink} to="/blog" color="gray.400" _hover={{ color: 'brand.300' }}>
              Blog
            </Link>
            <Link as={RouterLink} to="/#contact" color="gray.400" _hover={{ color: 'brand.300' }}>
              Contact
            </Link>
            <Link
              as="a"
              href={`mailto:${profile.email}`}
              color="gray.400"
              _hover={{ color: 'brand.300' }}
            >
              {profile.email}
            </Link>
          </Stack>
        </Stack>

        <Text mt={8} fontSize="sm" color="gray.600" textAlign="center">
          © {year} {profile.name}. Content managed in{' '}
          <Link href="https://www.aurysilva.co.uk/wp-admin" isExternal color="brand.400">
            WordPress
          </Link>
          .
        </Text>
      </Container>
    </Box>
  )
}
