import { useQuery, useMutation } from "@tanstack/react-query";
import { useBooksApi } from "@/lib/graphql";
import type { Book } from "@/components/dashboard/BookModal";

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
