import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Link,
  Spacer,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { profile } from '@/data/profile'
import { scrollToSection } from '@/lib/content'
import { useSiteInfo } from '@/lib/wordpress'

const navItems = [
  { label: 'Home', href: '/', section: 'hero' },
  { label: 'About', href: '/#about', section: 'about' },
  { label: 'Skills', href: '/#skills', section: 'skills' },
  { label: 'Portfolio', href: '/portfolio', section: 'portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact', section: 'contact' },
]

export function Header() {
  const location = useLocation()
  const { data: siteInfo } = useSiteInfo()
  const { colorMode, toggleColorMode } = useColorMode()
  const isHome = location.pathname === '/'

  const handleNav = (item: (typeof navItems)[number]) => {
    if (item.section && isHome) {
      scrollToSection(item.section)
      return
    }
  }

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg="rgba(7, 11, 20, 0.85)"
      backdropFilter="blur(12px)"
      borderBottomWidth="1px"
      borderColor="whiteAlpha.100"
    >
      <Container py={4}>
        <Flex align="center" gap={4}>
          <Link
            as={RouterLink}
            to="/"
            fontWeight="800"
            fontSize="lg"
            letterSpacing="-0.02em"
            _hover={{ textDecoration: 'none', color: 'brand.300' }}
          >
            {siteInfo?.name ?? profile.name.split(' ')[0]}
            <Text as="span" color="brand.400">
              .
            </Text>
          </Link>

          <Spacer />

          <HStack spacing={1} display={{ base: 'none', lg: 'flex' }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                as={RouterLink}
                to={item.href}
                onClick={() => handleNav(item)}
                px={3}
                py={2}
                borderRadius="md"
                fontSize="sm"
                fontWeight="medium"
                color={
                  location.pathname === item.href ||
                  (isHome && item.section && location.hash === `#${item.section}`)
                    ? 'brand.300'
                    : 'gray.300'
                }
                _hover={{ textDecoration: 'none', color: 'brand.300' }}
              >
                {item.label}
              </Link>
            ))}
          </HStack>

          <Button
            as="a"
            href={`mailto:${profile.email}`}
            size="sm"
            display={{ base: 'none', md: 'inline-flex' }}
            variant="outline"
            borderColor="brand.500"
            color="brand.300"
          >
            Hire me
          </Button>

          <IconButton
            aria-label="Toggle color mode"
            onClick={toggleColorMode}
            variant="ghost"
            size="sm"
            icon={<Text fontSize="sm">{colorMode === 'dark' ? '☀️' : '🌙'}</Text>}
          />
        </Flex>

        <HStack
          spacing={1}
          pt={3}
          display={{ base: 'flex', lg: 'none' }}
          overflowX="auto"
          css={{ '&::-webkit-scrollbar': { display: 'none' } }}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              as={RouterLink}
              to={item.href}
              onClick={() => handleNav(item)}
              px={3}
              py={2}
              borderRadius="full"
              fontSize="sm"
              whiteSpace="nowrap"
              bg="surface.700"
              _hover={{ textDecoration: 'none', color: 'brand.300' }}
            >
              {item.label}
            </Link>
          ))}
        </HStack>
      </Container>
    </Box>
  )
}
