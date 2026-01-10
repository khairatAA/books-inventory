import { toaster } from "@/components/ui/toaster";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";

const DashboardInterface = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !isLoading && !hasShownToast.current) {
      toaster.create({
        title: "Login successful 🎉",
        description: `Welcome back${user?.name ? `, ${user.name}` : ""}!`,
        type: "success",
      });

      hasShownToast.current = true;
    }
  }, [isAuthenticated, isLoading, user]);

  return (
    <div>
      {/* Your dashboard UI */}
      Dashboard
    </div>
  );
};

export default DashboardInterface;
