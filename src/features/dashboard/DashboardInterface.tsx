import { Box, Button, Flex } from "@chakra-ui/react";
import Navbar from "@/components/layout/Navbar";
import BookModal, { type Book } from "@/components/dashboard/BookModal";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import BooksTable from "@/components/dashboard/BooksTable";
import { toaster } from "@/components/ui/toaster";
import { useBooks } from "@/hooks/useBooks";

const DashboardInterface = () => {
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { booksQuery, addBook, editBook, removeBook } = useBooks();

  const books = booksQuery.data || [];
  const isLoading = booksQuery.isLoading;

  const handleAdd = () => {
    setSelectedBook(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDelete = async (book: Book) => {
    if (!book.id) return;

    await toaster.promise(removeBook.mutateAsync(book.id), {
      loading: { title: "Deleting book..." },
      success: {
        title: "Book deleted!",
        description: `${book.name} has been removed.`,
      },
      error: {
        title: "Delete failed",
        description: `Failed to delete ${book.name}.`,
      },
    });
  };

  const handleSubmit = async (data: Book, id?: number) => {
    if (id) {
      await toaster.promise(editBook.mutateAsync({ id, book: data }), {
        loading: { title: "Updating book..." },
        success: {
          title: "Book updated!",
          description: `${data.name} updated successfully.`,
        },
        error: {
          title: "Update failed",
          description: `Failed to update ${data.name}.`,
        },
      });
    } else {
      await toaster.promise(addBook.mutateAsync(data), {
        loading: { title: "Adding book..." },
        success: {
          title: "Book added!",
          description: `${data.name} added successfully.`,
        },
        error: {
          title: "Add failed",
          description: `Failed to add ${data.name}.`,
        },
      });
    }

    setIsModalOpen(false);
  };

  return (
    <>
      <Box minH="100vh" bg="gray.50">
        <Navbar />

        <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={6}>
          <Flex justify="flex-start" mb={6}>
            <Button paddingInline={3} onClick={handleAdd}>
              <FiPlus />
              Add Book
            </Button>
          </Flex>

          <BooksTable
            books={books}
            isError={booksQuery.isError}
            isLoading={isLoading}
            onRetry={booksQuery.refetch}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Box>
      </Box>

      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        book={selectedBook}
        onSubmitAction={handleSubmit}
      />
    </>
  );
};

export default DashboardInterface;
