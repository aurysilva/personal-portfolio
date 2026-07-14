import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { PortfolioPage } from '@/pages/PortfolioPage'
import { PortfolioView } from '@/pages/PortfolioView'
import { BlogPage } from '@/pages/BlogPage'
import { PostView } from '@/pages/PostView'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="portfolio/:slug" element={<PortfolioView />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<PostView />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
