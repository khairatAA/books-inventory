import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SplashScreen from "./components/ui/SplashScreen";
import { Toaster } from "@/components/ui/toaster";
import PublicRoute from "./auth/PublicRoute";
import PrivateRoute from "./auth/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";

const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

function App() {
  return (
    <div className="font-montserrat bg-white h-full w-full">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<SplashScreen />}>
              <PublicRoute>
                <WelcomePage />
              </PublicRoute>
            </Suspense>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<SplashScreen />}>
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
