import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import type { JSX } from "react";

type PublicRouteProps = {
  children: JSX.Element;
};

/**
 * PublicRoute
 * -----------
 * Route guard component for public (unauthenticated) pages.
 *
 * Responsibilities:
 * - Allows access only to unauthenticated users
 * - Prevents authenticated users from accessing public routes (e.g. login page)
 * - Redirects authenticated users to the dashboard
 * - Avoids UI flicker while Auth0 authentication state is initializing
 */

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Prevent flicker while Auth0 initializes
  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
