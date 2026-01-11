import { Box, Button, Flex } from "@chakra-ui/react";
import Navbar from "@/components/layout/Navbar";
import BookModal, { type Book } from "@/components/dashboard/BookModal";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { dummyBooks } from "@/components/dashboard/dummyBooks";
import BooksTable from "@/components/dashboard/BooksTable";
import { toaster } from "@/components/ui/toaster";

const DashboardInterface = () => {
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>(dummyBooks);

  const handleAdd = () => {
    setSelectedBook(undefined); // clear form
    setIsModalOpen(true);
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book); // prefill form
    setIsModalOpen(true);
  };

  const handleDelete = (book: Book) => {
    toaster.promise(
      new Promise<void>((resolve) => {
        setBooks((prev) => prev.filter((b) => b.id !== book.id));
        resolve();
      }),
      {
        loading: { title: "Deleting book..." },
        success: {
          title: "Book deleted!",
          description: `${book.name} has been removed.`,
        },
        error: {
          title: "Delete failed",
          description: `Failed to delete ${book.name}.`,
        },
      }
    );
  };

  const handleSubmit = async (data: Book, id?: number) => {
    if (id) {
      // call edit endpoint
      console.log("Edit book", id, data);
      setBooks((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...data } : b))
      );
    } else {
      // call create endpoint
      console.log("Add new book", data);
      setBooks((prev) => [...prev, { ...data, id: prev.length + 1 }]);
    }
  };

  return (
    <>
      <Box minH="100vh" bg="gray.50">
        <Navbar />

        {/* Main dashboard content */}
        <Box px={{ base: 4, md: 8 }} py={6}>
          {/* Header actions */}
          <Flex justify="flex-start" mb={6}>
            <Button paddingInline={3} onClick={handleAdd}>
              <FiPlus />
              Add Book
            </Button>
          </Flex>

          {/* Books table will go here */}
          <BooksTable
            books={books}
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
