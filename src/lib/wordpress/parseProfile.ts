import { decodeHtmlEntities } from '@/lib/content'
import type { Profile } from '@/data/profile'
import { stripHtml } from './client'
import type { WpSiteInfo } from './types'

function cleanText(html: string): string {
  return decodeHtmlEntities(stripHtml(html)).replace(/\s+/g, ' ').trim()
}

function formatPersonName(name: string): string {
  return name
    .replace(/\s*[–—-]\s*.+$/, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ')
}

function parseRoles(html: string): string[] {
  const flipBlock = html.match(/id="flip"[\s\S]*?<\/div>\s*<\/div>/i)?.[0]
  if (!flipBlock) return []

  return [...flipBlock.matchAll(/<div><div>([^<]+)<\/div><\/div>/g)]
    .map((match) => cleanText(match[1]))
    .filter(Boolean)
}

function parseIntro(html: string): string {
  const match = html.match(
    /id="flip"[\s\S]*?<\/div>\s*<\/div>[\s\S]*?<div style="max-width:[^"]*">([\s\S]*?)<\/div>/i,
  )
  return match ? cleanText(match[1]) : ''
}

function parseAbout(html: string): string {
  const match = html.match(
    /About me<\/h2>[\s\S]*?elementor-widget-text-editor[\s\S]*?elementor-widget-container">\s*([\s\S]*?)\s*<\/div>\s*<\/div>\s*<\/section>/i,
  )
  if (!match) return ''

  const paragraphs = [...match[1].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((entry) => cleanText(entry[1]))
    .filter(Boolean)

  return paragraphs.join('\n\n')
}

function parseHighlights(html: string): string[] {
  return [...html.matchAll(/elementor-icon-list-text[^>]*>([^<]+)/gi)]
    .map((match) => cleanText(match[1]))
    .filter(Boolean)
}

function parseSkills(html: string): Profile['skills'] {
  return [...html.matchAll(/aria-valuetext="(\d+)% \(([^"]+)\)"/gi)].map(
    (match) => ({
      level: Number.parseInt(match[1], 10),
      name: cleanText(match[2]),
    }),
  )
}

function parseHeroStats(html: string): Profile['stats'] {
  const titles = [...html.matchAll(/elementor-icon-box-title[\s\S]{0,80}?>\s*<a[^>]*>\s*([^<]+)<\/a>/gi)]
    .slice(0, 3)
    .map((match) => cleanText(match[1]))

  const mapped = titles.map((title) => {
    if (/^\d+\+?\s*years?/i.test(title)) {
      return { value: title.match(/^\d+\+?/)?.[0] ?? title, label: 'Years Dev Experience' }
    }
    if (/^ba\b/i.test(title)) {
      return { value: 'BA', label: title.replace(/\?$/, '') }
    }
    if (/b2b|b2c/i.test(title)) {
      return { value: 'B2B & B2C', label: 'Agency Experience' }
    }
    return { value: title, label: title }
  })

  if (mapped.length > 0) {
    mapped.push({ value: 'Available', label: 'Open to opportunities' })
  }

  return mapped
}

interface IconBoxEntry {
  org: string
  title: string
  period: string
}

function parseIconBoxes(html: string): IconBoxEntry[] {
  return [
    ...html.matchAll(
      /elementor-icon-box-title[\s\S]{0,120}?>\s*(?:<span[^>]*>\s*)?([^<]+?)\s*(?:<\/span>)?\s*<\/h2>[\s\S]{0,300}?elementor-icon-box-description[\s\S]{0,200}?text-white">([^<]+)[\s\S]{0,200}?time text-yellow">([^<]+)/gi,
    ),
  ].map((match) => ({
    org: cleanText(match[1]),
    title: cleanText(match[2]),
    period: cleanText(match[3]),
  }))
}

function parseQualifications(html: string): Profile['qualifications'] {
  const qualSection = html.split(/Qualifications<\/h2>/i)[1] ?? html
  return parseIconBoxes(qualSection)
    .slice(0, 3)
    .map((entry) => ({
      org: entry.org,
      title: entry.title.replace(/^Studied\s+/i, ''),
      period: entry.period,
    }))
}

function parseExperience(html: string): Profile['experience'] {
  const qualIndex = html.search(/Qualifications<\/h2>/i)
  const experienceHtml = qualIndex >= 0 ? html.slice(qualIndex) : html

  return parseIconBoxes(experienceHtml)
    .slice(3, 6)
    .map((entry) => ({
      org: entry.org,
      role: entry.title,
      period: entry.period,
    }))
}

function parseProcess(html: string): Profile['process'] {
  return [
    ...html.matchAll(
      /(\d{2})\.<\/span>[\s\S]{0,800}?<h3 class="elementor-heading-title[^"]*">([^<]+)<\/h3>[\s\S]{0,800}?<p>([^<]+)<\/p>/gi,
    ),
  ].map((match) => ({
    step: match[1],
    title: cleanText(match[2]),
    description: cleanText(match[3]),
  }))
}

function parsePhone(html: string): string {
  return html.match(/\b0\d{10,11}\b/)?.[0] ?? ''
}

function parseProfileImage(html: string): string | undefined {
  return html.match(
    /https:\/\/www\.aurysilva\.co\.uk\/wp-content\/uploads\/[^"'\s]+IMG_1526[^"'\s]+/i,
  )?.[0]
}

export function parseProfileFromPage(
  html: string,
  siteInfo?: WpSiteInfo | null,
): Partial<Profile> {
  const roles = parseRoles(html)
  const intro = parseIntro(html)
  const about = parseAbout(html)
  const highlights = parseHighlights(html)
  const skills = parseSkills(html)
  const stats = parseHeroStats(html)
  const qualifications = parseQualifications(html)
  const experience = parseExperience(html)
  const process = parseProcess(html)
  const phone = parsePhone(html)
  const profileImage = parseProfileImage(html)

  return {
    name: siteInfo?.name ? formatPersonName(siteInfo.name) : undefined,
    title: siteInfo?.description ? cleanText(siteInfo.description) : undefined,
    location: about.includes('Hull') ? 'Hull, United Kingdom' : undefined,
    phone: phone || undefined,
    available: true,
    roles: roles.length ? roles : undefined,
    intro: intro || undefined,
    about: about || undefined,
    highlights: highlights.length ? highlights : undefined,
    stats: stats.length ? stats : undefined,
    skills: skills.length ? skills : undefined,
    qualifications: qualifications.length ? qualifications : undefined,
    experience: experience.length ? experience : undefined,
    process: process.length ? process : undefined,
    profileImage,
  }
}

export function mergeProfile(
  parsed: Partial<Profile>,
  fallback: Profile,
): Profile {
  return {
    ...fallback,
    ...Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => {
        if (value === undefined || value === null || value === '') return false
        if (Array.isArray(value)) return value.length > 0
        return true
      }),
    ),
    email: fallback.email,
    social: fallback.social,
  }
}
