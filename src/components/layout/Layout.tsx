import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box as="main" flex="1" py={{ base: 8, md: 12 }}>
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  )
}
