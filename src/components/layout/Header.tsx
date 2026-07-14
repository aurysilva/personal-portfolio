import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Link,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useMenu, useSiteInfo, mapMenuUrlToPath } from '@/lib/wordpress'

const fallbackNav = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
]

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      variant="ghost"
      size="sm"
      icon={<Text>{colorMode === 'light' ? '🌙' : '☀️'}</Text>}
    />
  )
}

export function Header() {
  const location = useLocation()
  const { data: siteInfo } = useSiteInfo()
  const { data: menuItems } = useMenu('primary')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const bg = useColorModeValue('white', 'gray.900')

  const navItems =
    menuItems && menuItems.length > 0
      ? menuItems
          .filter((item) => item.parent === 0)
          .sort((a, b) => a.order - b.order)
          .map((item) => {
            const path = mapMenuUrlToPath(item.url)
            return {
              label: item.title.rendered,
              path,
              external: path.startsWith('http'),
            }
          })
      : fallbackNav.map((item) => ({ ...item, external: false }))

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg={bg}
      borderBottomWidth="1px"
      borderColor={borderColor}
      backdropFilter="blur(8px)"
    >
      <Container py={4}>
        <Flex align="center" gap={4}>
          <Link
            as={RouterLink}
            to="/"
            fontWeight="bold"
            fontSize="lg"
            _hover={{ textDecoration: 'none', color: 'brand.500' }}
          >
            {siteInfo?.name ?? 'Portfolio'}
          </Link>
          <Spacer />
          <HStack spacing={1} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) =>
              item.external ? (
                <Link
                  key={item.path}
                  href={item.path}
                  px={3}
                  py={2}
                  borderRadius="md"
                  fontWeight="medium"
                  isExternal
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  px={3}
                  py={2}
                  borderRadius="md"
                  fontWeight="medium"
                  color={location.pathname === item.path ? 'brand.500' : undefined}
                  bg={location.pathname === item.path ? 'brand.50' : undefined}
                  _dark={{
                    bg: location.pathname === item.path ? 'whiteAlpha.100' : undefined,
                  }}
                  _hover={{ textDecoration: 'none', color: 'brand.500' }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </HStack>
          <ColorModeToggle />
        </Flex>
        <HStack
          spacing={1}
          pt={3}
          display={{ base: 'flex', md: 'none' }}
          overflowX="auto"
          css={{ '&::-webkit-scrollbar': { display: 'none' } }}
        >
          {navItems.map((item) =>
            item.external ? (
              <Link
                key={item.path}
                href={item.path}
                px={3}
                py={2}
                borderRadius="md"
                fontWeight="medium"
                whiteSpace="nowrap"
                isExternal
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.path}
                as={RouterLink}
                to={item.path}
                px={3}
                py={2}
                borderRadius="md"
                fontWeight="medium"
                whiteSpace="nowrap"
                color={location.pathname === item.path ? 'brand.500' : undefined}
                _hover={{ textDecoration: 'none', color: 'brand.500' }}
              >
                {item.label}
              </Link>
            ),
          )}
        </HStack>
      </Container>
    </Box>
  )
}
