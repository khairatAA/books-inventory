import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import { system } from "./theme";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import { AuthApolloProvider } from "./lib/AuthApolloProvider";
import { queryClient } from "@/lib/queryClient";

import "./index.css";

/**
 * Entry Point
 * -----------
 * Bootstraps the React application.
 *
 * Responsibilities:
 * - Provide Chakra UI theming using `ChakraProvider` with a custom `system` theme.
 * - Provide React Query functionality via `QueryClientProvider`.
 * - Wrap the app in `BrowserRouter` for client-side routing.
 * - Integrate Auth0 authentication with `Auth0ProviderWithNavigate`.
 * - Wrap the app in `AuthApolloProvider` for Apollo GraphQL client with Auth token support.
 * - Render the app into the root DOM element.
 */

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Auth0ProviderWithNavigate>
            <AuthApolloProvider>
              <App />
            </AuthApolloProvider>
          </Auth0ProviderWithNavigate>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>
);
