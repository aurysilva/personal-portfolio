import {
  Box,
  Heading,
  Stack,
  Text,
  type StackProps,
} from '@chakra-ui/react'

interface SectionHeadingProps extends StackProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  ...props
}: SectionHeadingProps) {
  return (
    <Stack
      spacing={3}
      textAlign={align}
      align={align === 'center' ? 'center' : 'flex-start'}
      maxW={align === 'center' ? '3xl' : '2xl'}
      mx={align === 'center' ? 'auto' : undefined}
      {...props}
    >
      <Text
        fontSize="sm"
        fontWeight="semibold"
        letterSpacing="wider"
        textTransform="uppercase"
        color="brand.400"
      >
        {eyebrow}
      </Text>
      <Heading
        as="h2"
        size={{ base: 'lg', md: 'xl' }}
        fontWeight="700"
        lineHeight="shorter"
      >
        {title}
      </Heading>
      {description && (
        <Text color="gray.400" fontSize={{ base: 'md', md: 'lg' }}>
          {description}
        </Text>
      )}
      <Box
        h="3px"
        w={align === 'center' ? '64px' : '48px'}
        bgGradient="linear(to-r, brand.400, accent.400)"
        borderRadius="full"
      />
    </Stack>
  )
}
