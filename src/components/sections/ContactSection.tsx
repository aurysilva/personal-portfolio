import type { ReactNode } from 'react'
import {
  Box,
  Button,
  Container,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { profile } from '@/data/profile'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { sectionPy } from '@/theme'

function MailIcon() {
  return (
    <Icon viewBox="0 0 24 24" boxSize={5}>
      <path
        fill="currentColor"
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 13 4 6.01V6h16ZM4 18V8.24l7.38 6.19a1 1 0 0 0 1.24 0L20 8.24V18H4Z"
      />
    </Icon>
  )
}

function PhoneIcon() {
  return (
    <Icon viewBox="0 0 24 24" boxSize={5}>
      <path
        fill="currentColor"
        d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1l-2.2 2.22Z"
      />
    </Icon>
  )
}

function PinIcon() {
  return (
    <Icon viewBox="0 0 24 24" boxSize={5}>
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5Z"
      />
    </Icon>
  )
}

export function ContactSection() {
  return (
    <Box as="section" id="contact" py={sectionPy} bg="surface.800">
      <Container>
        <Stack spacing={10}>
          <SectionHeading
            eyebrow="Get in touch"
            title="Let's build something together"
            description="Available for freelance, contract, and full-time opportunities. Reach out anytime."
            align="center"
          />

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} maxW="4xl" mx="auto" w="100%">
            <ContactCard
              icon={<PinIcon />}
              label="Location"
              value={profile.location}
            />
            <ContactCard
              icon={<MailIcon />}
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
            />
            <ContactCard
              icon={<PhoneIcon />}
              label="Phone"
              value={profile.phone}
              href={`tel:${profile.phone.replace(/\s/g, '')}`}
            />
          </SimpleGrid>

          <Stack align="center" spacing={4}>
            <Button
              as="a"
              href={`mailto:${profile.email}`}
              size="lg"
              bgGradient="linear(to-r, brand.500, brand.400)"
              _hover={{ bgGradient: 'linear(to-r, brand.400, brand.300)' }}
            >
              Send an email
            </Button>
            <Text color="gray.500" fontSize="sm">
              Or connect on{' '}
              <Box
                as="a"
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                color="brand.300"
                textDecoration="underline"
              >
                GitHub
              </Box>
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <Stack
      p={6}
      borderRadius="2xl"
      bg="surface.700"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      spacing={3}
      align="center"
      textAlign="center"
      h="100%"
      transition="border-color 0.2s"
      _hover={{ borderColor: 'brand.500' }}
    >
      <Box color="brand.300">{icon}</Box>
      <Text fontSize="sm" color="gray.500" textTransform="uppercase" letterSpacing="wide">
        {label}
      </Text>
      <Text fontWeight="semibold">{value}</Text>
    </Stack>
  )

  if (href) {
    return (
      <Box as="a" href={href} _hover={{ textDecoration: 'none' }}>
        {content}
      </Box>
    )
  }

  return content
}
