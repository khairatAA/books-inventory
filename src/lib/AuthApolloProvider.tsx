import React, { type ReactNode, useMemo } from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  children: ReactNode;
}

/**
 * AuthApolloProvider
 * -----------------
 * Wraps the React app with ApolloProvider and injects authentication headers.
 *
 * Responsibilities:
 * - Creates Apollo Client with HTTP + Auth links
 * - Retrieves Auth0 access token silently and attaches it to GraphQL requests
 * - Provides a memoized Apollo Client instance to avoid unnecessary re-renders
 */

export const AuthApolloProvider: React.FC<Props> = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();

  // HTTP link to GraphQL server
  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_APP_API_BASE_URL + "/graphql",
  });

  // Auth link
  const authLink = setContext(async (_, { headers }) => {
    let token = "";
    try {
      token = await getAccessTokenSilently();
    } catch (e) {
      console.warn("No token available", e);
    }
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = useMemo(
    () =>
      new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      }),
    [authLink, httpLink]
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
