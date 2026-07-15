import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '@/lib/content'

export function HashScrollHandler() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return

    const sectionId = location.hash.slice(1)
    if (!sectionId) return

    const timer = window.setTimeout(() => {
      scrollToSection(sectionId)
    }, 100)

    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash])

  return null
}
