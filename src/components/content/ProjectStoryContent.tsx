import { Box } from '@chakra-ui/react'

interface ProjectStoryContentProps {
  html: string
}

export function ProjectStoryContent({ html }: ProjectStoryContentProps) {
  return (
    <Box
      className="project-story"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
