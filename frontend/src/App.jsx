import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, lazy, Suspense } from "react";

import { useAuth } from "./hooks/useAuth";

import Navbar from "./components/navbar/Navbar";
import ScrollToTop from "./components/common/ScrollToTop";
import FallbackComponent from "./components/common/FallBackComponent";
import LoadingSpinner from "./components/common/LoadingSpinner";

const StandingsPage = lazy(() => import("./pages/StandingsPage"));
const PredictorPage = lazy(() => import("./pages/PredictorPage"));
const PlayoffPage = lazy(() => import("./pages/PlayoffPage"));
const TeamsPage = lazy(() => import("./pages/TeamsPage"));
const TeamStatsPage = lazy(() => import("./pages/TeamStatsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const EmailVerificatonPage = lazy(() => import("./pages/EmailVerificationPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuth();
  const isGuest = !isAuthenticated;

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const requireAuth = (element) => (isAuthenticated ? element : <Navigate to="/login" replace />);
  const requireAdmin = (element) => (isAuthenticated && user?.role === "admin" ? element : <Navigate to="/" replace />);
  const requireGuest = (element) => (isGuest ? element : <Navigate to="/" replace />);

  return (
    <div className="flex flex-col mx-auto min-h-screen bg-gradient-to-b from-base-100 via-base-300 to-base-200">
      <Navbar isGuest={isGuest} />
      <ScrollToTop />
      <Suspense fallback={<FallbackComponent />}>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<StandingsPage />} />
          <Route path="/predictor" element={<PredictorPage />} />
          <Route path="/playoff" element={<PlayoffPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/team-stats/:teamId" element={<TeamStatsPage />} />
          <Route path="/profile" element={requireAuth(<ProfilePage />)} />

          {/* Auth */}
          <Route path="/signup" element={requireGuest(<SignUpPage />)} />
          <Route path="/login" element={requireGuest(<LoginPage />)} />
          <Route
            path="/verify-email"
            element={isAuthenticated && !user.isVerified ? <EmailVerificatonPage /> : <Navigate to="/" />}
          />
          <Route path="/forgot-password" element={requireGuest(<ForgotPasswordPage />)} />
          <Route path="/reset-password/:token" element={requireGuest(<ResetPasswordPage />)} />

          {/* Admin */}
          <Route path="/admin-dashboard" element={requireAdmin(<AdminPage />)} />

          {/* Catch-all route - 404 Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;
