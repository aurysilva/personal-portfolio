export type SkillCategoryId =
  | 'frontend'
  | 'email'
  | 'cms'
  | 'design'
  | 'platform'
  | 'other'

export interface SkillItem {
  name: string
  level: number
}

export interface SkillGroup {
  id: SkillCategoryId
  label: string
  description: string
  skills: SkillItem[]
}

export interface SkillStats {
  count: number
  average: number
  top: SkillItem
}

const CATEGORY_META: Record<
  SkillCategoryId,
  { label: string; description: string; order: number }
> = {
  frontend: {
    label: 'Frontend & JavaScript',
    description: 'UI engineering, component libraries, and client-side tooling.',
    order: 1,
  },
  platform: {
    label: 'Backend & DevOps',
    description: 'Server-side stacks, databases, and deployment workflows.',
    order: 2,
  },
  email: {
    label: 'Email & CRM',
    description: 'Campaign builds, marketing automation, and CRM integrations.',
    order: 3,
  },
  design: {
    label: 'Design & SEO',
    description: 'Visual design tools and search optimisation.',
    order: 4,
  },
  cms: {
    label: 'CMS & Page Builders',
    description: 'Content platforms, commerce, and landing-page systems.',
    order: 5,
  },
  other: {
    label: 'Other',
    description: 'Additional tools and technologies.',
    order: 6,
  },
}

export function normalizeSkillName(name: string): string {
  return name.replace(/^[\|\s]+/, '').replace(/\s+/g, ' ').trim()
}

function inferCategories(name: string): SkillCategoryId[] {
  const value = normalizeSkillName(name).toLowerCase()
  const categories = new Set<SkillCategoryId>()

  if (/api integration/.test(value)) {
    categories.add('frontend')
    categories.add('platform')
  }

  if (
    /react|javascript|html|css|storybook|graphql|graph ql|shopify\.liquid|vanilla|jquery|styled component|axios|typescript/.test(
      value,
    )
  ) {
    categories.add('frontend')
  }
  if (/email|crm|marketo|salesforce|mjml|pardot|adestra|responsys|marketing/.test(value)) {
    categories.add('email')
  }
  if (
    /cms|wordpress|shopify|kentico|umbraco|page builder|instapage|unbounce|drupal|woocommerce/.test(
      value,
    )
  ) {
    categories.add('cms')
  }
  if (/figma|adobe|photoshop|illustrator|seo|optimization|design/.test(value)) {
    categories.add('design')
  }
  if (
    /azure|devops|dev ops|node\.js|node js|app services|c#|\.net|asp\.net|php|mysql|database|phpmyadmin/.test(
      value,
    )
  ) {
    categories.add('platform')
  }

  if (categories.size === 0) {
    categories.add('other')
  }

  return [...categories]
}

export function groupSkills(skills: SkillItem[]): SkillGroup[] {
  const buckets = new Map<SkillCategoryId, SkillItem[]>()

  for (const skill of skills) {
    const normalized = {
      ...skill,
      name: normalizeSkillName(skill.name),
    }
    if (!normalized.name) continue

    for (const category of inferCategories(normalized.name)) {
      const list = buckets.get(category) ?? []
      list.push(normalized)
      buckets.set(category, list)
    }
  }

  return [...buckets.entries()]
    .map(([id, items]) => ({
      id,
      label: CATEGORY_META[id].label,
      description: CATEGORY_META[id].description,
      skills: [...items].sort((a, b) => b.level - a.level),
    }))
    .sort((a, b) => CATEGORY_META[a.id].order - CATEGORY_META[b.id].order)
    .filter((group) => group.skills.length > 0)
}

export function computeSkillStats(skills: SkillItem[]): SkillStats | null {
  if (skills.length === 0) return null

  const average = Math.round(
    skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length,
  )
  const top = [...skills].sort((a, b) => b.level - a.level)[0]

  return { count: skills.length, average, top }
}

export function proficiencyLabel(level: number): string {
  if (level >= 90) return 'Expert'
  if (level >= 80) return 'Advanced'
  if (level >= 70) return 'Proficient'
  return 'Capable'
}

export function shortSkillName(name: string): string {
  return name.split(/[/(&]/)[0].trim()
}
