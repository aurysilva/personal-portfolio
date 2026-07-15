import { Box } from '@chakra-ui/react'
import { PageMeta } from '@/components/seo/PageMeta'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MarqueeStrip } from '@/components/ui/MarqueeStrip'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { profile } from '@/data/profile'

const marqueeItems = [
  ...profile.roles,
  'React & TypeScript',
  'WordPress',
  'Email Development',
  'UI/UX Design',
  'Shopify',
  'Marketo & Salesforce',
]

export function HomePage() {
  return (
    <Box as="main">
      <PageMeta
        title={`${profile.name} – ${profile.title}`}
        description={profile.about.slice(0, 160)}
      />

      <HeroSection />

      <ScrollReveal>
        <MarqueeStrip items={marqueeItems} />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <AboutSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <SkillsSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <PortfolioSection carousel />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <ProcessSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <ExperienceSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <BlogPreviewSection limit={3} />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <ContactSection />
      </ScrollReveal>
    </Box>
  )
}
