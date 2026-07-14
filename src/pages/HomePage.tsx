import { Stack } from '@chakra-ui/react'
import { PageMeta } from '@/components/seo/PageMeta'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { profile } from '@/data/profile'

export function HomePage() {
  return (
    <>
      <PageMeta
        title={`${profile.name} – ${profile.title}`}
        description={profile.about.slice(0, 160)}
      />
      <Stack spacing={0}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProcessSection />
        <PortfolioSection limit={6} />
        <ExperienceSection />
        <BlogPreviewSection limit={3} />
        <ContactSection />
      </Stack>
    </>
  )
}
