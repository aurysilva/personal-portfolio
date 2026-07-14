import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { PageView } from '@/pages/PageView'
import { BlogPage } from '@/pages/BlogPage'
import { PostView } from '@/pages/PostView'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<PostView />} />
        <Route path=":slug" element={<PageView />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
