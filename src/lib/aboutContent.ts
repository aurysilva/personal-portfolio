const ABOUT_EMPHASIS_TERMS = [
  'Full-Stack Developer',
  '10 years of comprehensive web development experience',
  'BA in Digital Design',
  'React (TypeScript and JavaScript)',
  'React Native',
  'Expo',
  '.NET Core',
  'Node.js',
  'WordPress',
  'Shopify',
  'SEO',
  'digital design',
  'Figma',
  'Adobe Suite',
]

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function highlightAboutText(text: string): string {
  let html = text

  for (const term of [...ABOUT_EMPHASIS_TERMS].sort((a, b) => b.length - a.length)) {
    html = html.replace(
      new RegExp(`(${escapeRegExp(term)})`, 'gi'),
      '<strong>$1</strong>',
    )
  }

  return html
}
