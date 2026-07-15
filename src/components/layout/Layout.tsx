import { useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Outlet, useLocation } from 'react-router-dom'
import { PageViewTracker } from '@/components/analytics/PageViewTracker'
import { HashScrollHandler } from '@/components/routing/HashScrollHandler'
import { ProfileProvider } from '@/context/ProfileContext'
import { prefetchPortfolioListing } from '@/lib/wordpress'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    prefetchPortfolioListing()
  }, [])

  return (
    <ProfileProvider>
      <PageViewTracker />
      <HashScrollHandler />
      <Flex direction="column" minH="100vh">
        <Header />
        <Box as="main" flex="1" py={isHome ? 0 : { base: 8, md: 12 }}>
          <Outlet />
        </Box>
        <Footer />
      </Flex>
    </ProfileProvider>
  )
}
