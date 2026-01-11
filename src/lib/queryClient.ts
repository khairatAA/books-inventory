import { QueryClient } from "@tanstack/react-query";

/**
 * queryClient
 * ------------
 * Configured instance of React Query's QueryClient.
 *
 * Responsibilities:
 * - Provides default options for queries and mutations
 * - Retries failed queries once
 * - Disables automatic refetching on window focus
 * - Logs mutation errors globally
 */

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // retry failed queries once
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    },
  },
});
