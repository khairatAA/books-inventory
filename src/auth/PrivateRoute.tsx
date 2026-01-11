import { Navigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, type JSX } from "react";
import { toaster } from "@/components/ui/toaster";

type PrivateRouteProps = {
  children: JSX.Element;
};

/**
 * PrivateRoute
 * ------------
 * Route guard component that restricts access to authenticated users only.
 *
 * Responsibilities:
 * - Checks authentication state using Auth0
 * - Prevents unauthenticated users from accessing protected routes
 * - Displays a warning toast when authentication is required
 * - Redirects unauthenticated users to the login page
 * - Preserves the originally requested route for post-login redirect
 */

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toaster.create({
        title: "Authentication required",
        description: "Please log in to access the dashboard.",
        type: "warning",
      });
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
