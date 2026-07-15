import { Box } from '@chakra-ui/react'

interface ArticleContentProps {
  html: string
}

export function ArticleContent({ html }: ArticleContentProps) {
  return (
    <Box
      className="article-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
