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
    live: find('view live', 'live version', 'live template', 'preview'),
    github: find('github', 'clone the project'),
    client: find("client's site", 'view client'),
  }
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
