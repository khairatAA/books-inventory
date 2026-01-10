import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import type { JSX } from "react";

type PublicRouteProps = {
  children: JSX.Element;
};

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
