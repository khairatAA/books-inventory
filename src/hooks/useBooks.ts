import { useQuery, useMutation } from "@tanstack/react-query";
import { useBooksApi } from "@/lib/graphql";
import type { Book } from "@/components/dashboard/BookModal";

/**
 * useBooks
 * --------
 * Custom hook that manages book-related data fetching and mutations.
 *
 * Responsibilities:
 * - Fetches the list of books using React Query
 * - Exposes create, update, and delete mutations
 * - Automatically refetches book data after successful mutations
 *
 * Architecture notes:
 * - Delegates GraphQL operations to useBooksApi
 * - Keeps UI components decoupled from data-fetching logic
 */

export const useBooks = () => {
  const { getBooks, createBook, updateBook, deleteBook } = useBooksApi();

  const booksQuery = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const addBook = useMutation({
    mutationFn: createBook,
    onSuccess: () => booksQuery.refetch(),
  });

  const editBook = useMutation({
    mutationFn: ({ id, book }: { id: number; book: Partial<Book> }) =>
      updateBook(id, book),
    onSuccess: () => booksQuery.refetch(),
  });

  const removeBook = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => booksQuery.refetch(),
  });

  return { booksQuery, addBook, editBook, removeBook };
};
