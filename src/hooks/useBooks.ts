import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Book } from "@/components/dashboard/BookModal";
import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
} from "@/components/services/books";

export const useBooks = () => {
  const queryClient = useQueryClient();

  // Fetch books
  const booksQuery = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  // Add book mutation
  const addBook = useMutation<Book, Error, Book>({
    mutationFn: createBook,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
  });

  // Edit book mutation
  const editBook = useMutation<Book, Error, { id: number; book: Book }>({
    mutationFn: ({ id, book }) => updateBook(id, book),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
  });

  // Delete book mutation
  const removeBook = useMutation<void, Error, number>({
    mutationFn: (id: number) => deleteBook(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
  });

  return { booksQuery, addBook, editBook, removeBook };
};
