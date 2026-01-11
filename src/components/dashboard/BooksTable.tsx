/**
 * BooksTable
 * ----------
 * Displays a paginated table of books with edit and delete actions.
 *
 * Responsibilities:
 * - Renders loading, error, empty, and populated table states
 * - Handles client-side pagination
 * - Truncates long text responsively to prevent layout overflow
 * - Exposes edit and delete actions to the parent component
 */

import {
  Button,
  IconButton,
  Stack,
  Table,
  HStack,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import type { Book } from "./BookModal";
import { TableEmpty, TableError, TableSkeleton } from "./BooksTableStates";

type BooksTableProps = {
  books: Book[];
  isLoading?: boolean;
  isError?: boolean;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onRetry?: () => void;
};

const PAGE_SIZE = 5;

const BooksTable = ({
  books,
  onEdit,
  onDelete,
  isError,
  isLoading,
  onRetry,
}: BooksTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(books.length / PAGE_SIZE);

  const paginatedBooks = books.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Responsive padding for Table cells
  const cellHeaderPadding = useBreakpointValue({ base: 2, md: 3 });
  const cellPadding = useBreakpointValue({ base: 1.5, md: 2.5 });

  return (
    <Stack width="full" gap={5}>
      <Table.Root variant="outline" size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader padding={cellHeaderPadding}>
              Book Name
            </Table.ColumnHeader>
            <Table.ColumnHeader padding={cellHeaderPadding}>
              Description
            </Table.ColumnHeader>
            <Table.ColumnHeader padding={cellHeaderPadding} textAlign="center">
              Actions
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {isLoading ? (
            <TableSkeleton />
          ) : isError ? (
            <TableError onRetry={onRetry} />
          ) : paginatedBooks.length === 0 ? (
            <TableEmpty />
          ) : (
            paginatedBooks.map((book) => (
              <Table.Row key={book.id}>
                <Table.Cell
                  padding={cellPadding}
                  width={{ base: 100, md: 200 }}
                >
                  <Text lineClamp={{ base: 3, md: 4 }}>{book.name}</Text>
                </Table.Cell>

                <Table.Cell padding={cellPadding}>
                  <Text lineClamp={{ base: 3, md: 5 }}>{book.description}</Text>
                </Table.Cell>

                <Table.Cell textAlign="center" padding={cellPadding}>
                  <HStack justify="center" gap={2}>
                    <IconButton
                      aria-label="Edit Book"
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(book)}
                    >
                      <FiEdit />
                    </IconButton>
                    <IconButton
                      aria-label="Delete Book"
                      size="sm"
                      colorPalette="red"
                      variant="outline"
                      onClick={() => onDelete(book)}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>

      {/* Manual Pagination */}
      <HStack justify="center" gap={3}>
        <Button
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          paddingInline={2}
        >
          <LuChevronLeft /> Prev
        </Button>

        {Array.from({ length: pageCount }, (_, i) => (
          <Button
            key={i + 1}
            size="sm"
            variant={currentPage === i + 1 ? "solid" : "outline"}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))}
          disabled={currentPage === pageCount}
          paddingInline={2}
        >
          Next <LuChevronRight />
        </Button>
      </HStack>
    </Stack>
  );
};

export default BooksTable;
