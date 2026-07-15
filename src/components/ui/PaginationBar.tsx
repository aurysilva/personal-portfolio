import { Button, Flex, HStack, Text } from '@chakra-ui/react'

interface PaginationBarProps {
  page: number
  totalPages: number
  total: number
  perPage: number
  onPageChange: (page: number) => void
}

export function PaginationBar({
  page,
  totalPages,
  total,
  perPage,
  onPageChange,
}: PaginationBarProps) {
  if (totalPages <= 1) return null

  const start = (page - 1) * perPage + 1
  const end = Math.min(page * perPage, total)

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <Flex
      direction={{ base: 'column', sm: 'row' }}
      align="center"
      justify="space-between"
      gap={4}
      pt={4}
    >
      <Text fontSize="sm" color="gray.500" fontFamily="mono">
        {String(start).padStart(2, '0')}–{String(end).padStart(2, '0')} of {total}
      </Text>

      <HStack spacing={2}>
        <Button
          size="sm"
          variant="outline"
          borderColor="whiteAlpha.300"
          borderRadius="full"
          onClick={() => onPageChange(page - 1)}
          isDisabled={page <= 1}
        >
          Previous
        </Button>

        {pages.map((pageNumber) => (
          <Button
            key={pageNumber}
            size="sm"
            variant={pageNumber === page ? 'solid' : 'outline'}
            colorScheme={pageNumber === page ? 'brand' : 'gray'}
            borderColor="whiteAlpha.200"
            borderRadius="full"
            minW={9}
            onClick={() => onPageChange(pageNumber)}
            display={{ base: pageNumber === page ? 'inline-flex' : 'none', sm: 'inline-flex' }}
          >
            {pageNumber}
          </Button>
        ))}

        <Button
          size="sm"
          variant="outline"
          borderColor="whiteAlpha.300"
          borderRadius="full"
          onClick={() => onPageChange(page + 1)}
          isDisabled={page >= totalPages}
        >
          Next
        </Button>
      </HStack>
    </Flex>
  )
}
