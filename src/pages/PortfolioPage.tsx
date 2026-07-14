import { Stack } from '@chakra-ui/react'
import { PageMeta } from '@/components/seo/PageMeta'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { profile } from '@/data/profile'

export function PortfolioPage() {
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
