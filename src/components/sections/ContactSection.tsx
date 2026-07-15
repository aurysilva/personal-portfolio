import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useProfile } from '@/context/ProfileContext'
import { sectionPy } from '@/theme'

export function ContactSection() {
  const { profile } = useProfile()

  return (
    <Box as="section" id="contact" position="relative" overflow="hidden">
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(circle at 50% 100%, rgba(6,182,212,0.2), transparent 60%)"
        pointerEvents="none"
      />

      <Container maxW="container.xl" py={sectionPy} position="relative">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'flex-start', lg: 'center' }}
          justify="space-between"
          gap={{ base: 10, lg: 16 }}
        >
          <Stack spacing={6} maxW="2xl">
            <Text
              fontSize="sm"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
              color="brand.400"
            >
              Get in touch
            </Text>
            <Heading
              size={{ base: '2xl', md: '3xl', lg: '4xl' }}
              fontWeight="800"
              letterSpacing="-0.03em"
              lineHeight="shorter"
            >
              Have a project in mind?{' '}
              <Text
                as="span"
                bgGradient="linear(to-r, brand.300, accent.400)"
                bgClip="text"
              >
                Let&apos;s talk.
              </Text>
            </Heading>
            <Text color="gray.400" fontSize="lg">
              Available for freelance, contract, and full-time opportunities across the UK and remote.
            </Text>
          </Stack>

          <Stack spacing={4} minW={{ lg: '320px' }}>
            <ContactLine label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactLine label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, '')}`} />
            <ContactLine label="Location" value={profile.location} />
            <Button
              as="a"
              href={`mailto:${profile.email}`}
              size="lg"
              mt={2}
              w="100%"
              bgGradient="linear(to-r, brand.500, brand.400)"
              _hover={{ bgGradient: 'linear(to-r, brand.400, brand.300)' }}
            >
              Send an email
            </Button>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              Or find me on{' '}
              <Link href={profile.social.github} isExternal color="brand.300">
                GitHub
              </Link>
            </Text>
          </Stack>
        </Flex>
      </Container>
    </Box>
  )
}

function ContactLine({
  label,
  value,
  href,
}: {
  label: string
  value: string
  href?: string
}) {
  const content = (
    <Flex
      justify="space-between"
      align="center"
      py={4}
      borderBottomWidth="1px"
      borderColor="whiteAlpha.100"
      gap={4}
    >
      <Text fontSize="xs" fontWeight="semibold" textTransform="uppercase" letterSpacing="wider" color="gray.500">
        {label}
      </Text>
      <Text fontWeight="medium" color="gray.200" fontSize="sm" textAlign="right">
        {value}
      </Text>
    </Flex>
  )

  if (href) {
    return (
      <Link href={href} _hover={{ textDecoration: 'none', color: 'brand.300' }}>
        {content}
      </Link>
    )
  }

  return content
}
