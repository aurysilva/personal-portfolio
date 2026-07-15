import { Stack } from '@chakra-ui/react'
import { PageMeta } from '@/components/seo/PageMeta'
import { useProfile } from '@/context/ProfileContext'
import { PortfolioSection } from '@/components/sections/PortfolioSection'

export function PortfolioPage() {
  const { profile } = useProfile()

  return (
    <>
      <PageMeta
        title={`Portfolio | ${profile.name}`}
        description="Projects spanning React, TypeScript, email development, landing pages, and CMS builds."
      />
      <Stack spacing={0}>
        <PortfolioSection showFilters />
      </Stack>
    </>
  )
}
