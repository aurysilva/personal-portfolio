import {
  Box,
  Container,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { ProjectImage } from '@/lib/content'

interface ProjectGalleryProps {
  images: ProjectImage[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  if (images.length === 0) return null

  return (
    <Box py={{ base: 12, md: 20 }}>
      <Container maxW="container.xl">
        <Stack spacing={8}>
          <Text
            fontSize="xs"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wider"
            color="gray.500"
          >
            Project Gallery
          </Text>

          <SimpleGrid columns={{ base: 1, md: images.length > 1 ? 2 : 1 }} spacing={6}>
            {images.map((image) => (
              <Box key={image.src} position="relative">
                {image.href ? (
                  <Link href={image.href} isExternal _hover={{ textDecoration: 'none' }}>
                    <GalleryImage image={image} />
                  </Link>
                ) : (
                  <GalleryImage image={image} />
                )}
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  )
}

function GalleryImage({ image }: { image: ProjectImage }) {
  return (
    <Box
      borderRadius="2xl"
      overflow="hidden"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      transition="transform 0.3s ease"
      _hover={{ transform: 'scale(1.01)' }}
    >
      <Image
        src={image.src}
        alt={image.caption ?? 'Project screenshot'}
        w="100%"
        objectFit="cover"
      />
      {image.caption && (
        <Text px={5} py={3} fontSize="sm" color="gray.500" bg="surface.800">
          {image.caption}
        </Text>
      )}
    </Box>
  )
}
