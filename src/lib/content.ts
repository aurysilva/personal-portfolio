export function extractProjectLinks(html: string): {
  live?: string
  github?: string
  client?: string
} {
  const links: { label: string; url: string }[] = []
  const anchorRegex = /<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi
  let match: RegExpExecArray | null

  while ((match = anchorRegex.exec(html)) !== null) {
    const url = match[1]
    const label = match[2].replace(/<[^>]*>/g, '').trim().toLowerCase()
    if (url && label) links.push({ label, url })
  }

  const find = (...patterns: string[]) =>
    links.find((link) => patterns.some((p) => link.label.includes(p)))?.url

  return {
    live: find('view live', 'live version', 'live template', 'preview', 'here'),
    github: find('github', 'clone the project'),
    client: find("client's site", 'view client', 'clint'),
  }
}

export interface ProjectQuote {
  text: string
  cite?: string
}

export interface ProjectImage {
  src: string
  caption?: string
  href?: string
}

export interface ProjectStorySection {
  number: string
  title: string
  html: string
}

export interface ParsedProjectStory {
  quote?: ProjectQuote
  images: ProjectImage[]
  sections: ProjectStorySection[]
}

export function extractBlockquote(html: string): ProjectQuote | undefined {
  const match = html.match(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i)
  if (!match) return undefined

  const inner = match[1]
  const citeMatch = inner.match(/<cite[^>]*>([\s\S]*?)<\/cite>/i)
  const text = decodeHtmlEntities(
    inner.replace(/<cite[\s\S]*?<\/cite>/gi, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
  )
  const cite = citeMatch
    ? decodeHtmlEntities(citeMatch[1].replace(/<[^>]*>/g, '').trim())
    : undefined

  return text ? { text, cite } : undefined
}

export function extractContentImages(html: string): ProjectImage[] {
  const images: ProjectImage[] = []
  const figureRegex = /<figure[^>]*>([\s\S]*?)<\/figure>/gi
  let match: RegExpExecArray | null

  while ((match = figureRegex.exec(html)) !== null) {
    const block = match[1]
    const imgMatch = block.match(/<img[^>]+src="([^"]+)"[^>]*>/i)
    const linkMatch = block.match(/<a[^>]+href="([^"]+)"[^>]*>/i)
    const captionMatch = block.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i)

    if (imgMatch) {
      images.push({
        src: imgMatch[1],
        href: linkMatch?.[1],
        caption: captionMatch
          ? decodeHtmlEntities(captionMatch[1].replace(/<[^>]*>/g, '').trim())
          : undefined,
      })
    }
  }

  return images
}

function stripNonContentBlocks(html: string): string {
  return html
    .replace(/<blockquote[\s\S]*?<\/blockquote>/gi, '')
    .replace(/<figure[\s\S]*?<\/figure>/gi, '')
    .replace(/<div class="wp-block-buttons[\s\S]*?<\/div>/gi, '')
    .replace(/<div class="wp-block-columns[\s\S]*?<\/div>/gi, '')
}

export function parseProjectStory(html: string): ParsedProjectStory {
  const quote = extractBlockquote(html)
  const images = extractContentImages(html)
  const body = stripNonContentBlocks(html)

  const deploymentHeader = body.match(/<p[^>]*>\s*<strong>Deployment<\/strong>\s*<\/p>/i)
  const challengeStart = body.search(/Before the deployment/i)

  let backgroundHtml = ''
  let challengeHtml = ''
  let solutionHtml = ''

  if (deploymentHeader && challengeStart > -1) {
    const deployIdx = body.indexOf(deploymentHeader[0])
    backgroundHtml = body.slice(0, challengeStart)
    challengeHtml = body.slice(challengeStart, deployIdx)
    solutionHtml = body.slice(deployIdx + deploymentHeader[0].length)
  } else if (deploymentHeader) {
    const deployIdx = body.indexOf(deploymentHeader[0])
    backgroundHtml = body.slice(0, deployIdx)
    solutionHtml = body.slice(deployIdx + deploymentHeader[0].length)
  } else {
    backgroundHtml = body
  }

  const sections: ProjectStorySection[] = []

  if (backgroundHtml.trim()) {
    sections.push({ number: '01', title: 'Background', html: backgroundHtml.trim() })
  }
  if (challengeHtml.trim()) {
    sections.push({ number: '02', title: 'The Challenge', html: challengeHtml.trim() })
  }
  if (solutionHtml.trim()) {
    sections.push({ number: '03', title: 'The Solution', html: solutionHtml.trim() })
  }

  if (sections.length === 0 && body.trim()) {
    sections.push({ number: '01', title: 'Project Overview', html: body.trim() })
  }

  return { quote, images, sections }
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const HTML_ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#039;': "'",
  '&nbsp;': ' ',
}

export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCharCode(parseInt(code, 16)),
    )
    .replace(/&[a-z]+;/gi, (entity) => HTML_ENTITIES[entity.toLowerCase()] ?? entity)
}

export function estimateReadingTime(html: string, wpm = 220): number {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const words = text.split(' ').filter(Boolean).length
  return Math.max(1, Math.ceil(words / wpm))
}

