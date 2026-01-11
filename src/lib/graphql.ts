import { gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client/react";
import type { Book } from "@/components/dashboard/BookModal";

export const useBooksApi = () => {
  const client = useApolloClient();

  // 1 Get all books
  const getBooks = async (): Promise<Book[]> => {
    const result = await client.query<{ books: Book[] }>({
      query: gql`
        query GetBooks {
          books {
            id
            name
            description
          }
        }
      `,
      fetchPolicy: "no-cache",
    });
    if (!result.data) throw new Error("No data returned");
    return result.data.books;
  };

  // 2 Create a new book
  const createBook = async (book: Omit<Book, "id">): Promise<Book> => {
    const result = await client.mutate<{ createBook: Book }>({
      mutation: gql`
        mutation CreateBook($name: String!, $description: String!) {
          createBook(name: $name, description: $description) {
            id
            name
            description
          }
        }
      `,
      variables: { name: book.name, description: book.description },
    });
    if (!result.data) throw new Error("No data returned");
    return result.data.createBook;
  };

  // 3 Update a book
  const updateBook = async (id: number, book: Partial<Book>): Promise<Book> => {
    const result = await client.mutate<{ updateBook: Book }>({
      mutation: gql`
        mutation UpdateBook($id: Int!, $name: String, $description: String) {
          updateBook(id: $id, name: $name, description: $description) {
            id
            name
            description
          }
        }
      `,
      variables: {
        id,
        name: book.name ?? null,
        description: book.description ?? null,
      },
    });
    if (!result.data) throw new Error("No data returned");
    return result.data.updateBook;
  };

  // 4 Delete a book
  const deleteBook = async (id: number): Promise<boolean> => {
    const result = await client.mutate<{ deleteBook: boolean }>({
      mutation: gql`
        mutation DeleteBook($id: Int!) {
          deleteBook(id: $id)
        }
      `,
      variables: { id },
    });
    if (!result.data) throw new Error("No data returned");
    return result.data.deleteBook;
  };

  return { getBooks, createBook, updateBook, deleteBook };
};
