"use client";

import {
  Button,
  IconButton,
  Stack,
  Table,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import type { Book } from "./BookModal";

type BooksTableProps = {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
};

const PAGE_SIZE = 10;

const BooksTable = ({ books, onEdit, onDelete }: BooksTableProps) => {
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
          {paginatedBooks.map((book) => (
            <Table.Row key={book.id}>
              <Table.Cell padding={cellPadding}>{book.name}</Table.Cell>
              <Table.Cell padding={cellPadding}>{book.description}</Table.Cell>
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
          ))}
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
