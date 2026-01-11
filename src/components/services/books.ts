import { api } from "@/lib/axios";
import type { Book } from "@/components/dashboard/BookModal";

export const getBooks = async (): Promise<Book[]> => {
  const { data } = await api.get("/books");
  return data;
};

export const createBook = async (book: Book): Promise<Book> => {
  const { data } = await api.post("/books", book);
  return data;
};

export const updateBook = async (id: number, book: Book): Promise<Book> => {
  const { data } = await api.put(`/books/${id}`, book);
  return data;
};

export const deleteBook = async (id: number): Promise<void> => {
  await api.delete(`/books/${id}`);
};
