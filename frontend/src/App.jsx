import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useCallback, lazy, Suspense } from "react";

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

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuth();
  const checkAuthCallback = useCallback(checkAuth, [checkAuth]);
  let didntSignUp = true;

  useEffect(() => {
    checkAuthCallback();
  }, [checkAuthCallback]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  didntSignUp = isAuthenticated ? false : true;

  return (
    <div className="flex flex-col mx-auto min-h-screen bg-gradient-to-b from-base-100 via-base-300 to-base-200">
      {<Navbar didntSignUp={didntSignUp} />}
      <ScrollToTop />
      <Suspense fallback={<FallbackComponent />}>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={!isAuthenticated && !didntSignUp ? <LoginPage /> : <StandingsPage />} />
          <Route path="/predictor" element={!isAuthenticated && !didntSignUp ? <LoginPage /> : <PredictorPage />} />
          <Route path="/playoff" element={!isAuthenticated && !didntSignUp ? <LoginPage /> : <PlayoffPage />} />
          <Route path="/teams" element={!isAuthenticated && !didntSignUp ? <LoginPage /> : <TeamsPage />} />
          <Route path="/team-stats/:teamId" element={!isAuthenticated && !didntSignUp ? <LoginPage /> : <TeamStatsPage />} />
          <Route path="/profile" element={!isAuthenticated ? <LoginPage /> : <ProfilePage />} />

          {/* Auth */}
          <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route
            path="/verify-email"
            element={isAuthenticated && !user.isVerified ? <EmailVerificatonPage /> : <Navigate to="/" />}
          />
          <Route
            path="/forgot-password"
            element={isAuthenticated && !didntSignUp ? <Navigate to="/" /> : <ForgotPasswordPage />}
          />
          <Route
            path="/reset-password/:token"
            element={isAuthenticated && !didntSignUp ? <Navigate to="/" /> : <ResetPasswordPage />}
          />

          {/* Admin */}
          <Route
            path="/admin-dashboard"
            element={isAuthenticated && !didntSignUp && user?.role === "admin" ? <AdminPage /> : <Navigate to="/" />}
          />

          {/* Catch-all route - redirects any unmatched paths to home/standings */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;
