import { Box } from '@chakra-ui/react'

interface WpContentProps {
  html: string
}

export function WpContent({ html }: WpContentProps) {
  return (
    <Box
      className="wp-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
