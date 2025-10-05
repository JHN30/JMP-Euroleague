import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useCallback, lazy, useState } from "react";

import Navbar from "./components/Navbar";
import { useAuth } from "./hooks/useAuth";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { BoundaryWithSuspense } from "./components/errors/RouteErrorBoundary";

// Core frequently-hit routes (eager-ish via first suspense resolution)
const Standings = lazy(() => import("./pages/Standings"));
const Predictor = lazy(() => import("./pages/Predictor"));
const TeamsPage = lazy(() => import("./pages/TeamsPage"));
const TeamStatsPage = lazy(() => import("./pages/TeamStatsPage"));

// Auth related (grouped logically; Vite will still decide chunk names but manualChunks can refine)
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const EmailVerificatonPage = lazy(() => import("./pages/EmailVerificatonPage"));

// Less frequent
const Playoff = lazy(() => import("./pages/Playoff"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

// Removed inline error boundary; using extracted component instead.

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuth();
  const checkAuthCallback = useCallback(checkAuth, [checkAuth]);
  let didntSignUp = true;

  useEffect(() => {
    checkAuthCallback();
  }, [checkAuthCallback]);

  // Idle prefetch for likely-next routes (predictor, teams, admin, verify) – MUST stay above any early returns
  useEffect(() => {
    const idle = (cb) => ("requestIdleCallback" in window ? window.requestIdleCallback(cb) : setTimeout(cb, 250));
    idle(() => {
      import("./pages/Predictor");
      import("./pages/TeamsPage");
      import("./pages/Standings");
      if (user?.role === "admin") import("./pages/AdminPage");
      if (user && !user.isVerified) import("./pages/EmailVerificatonPage");
    });
  }, [user]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  didntSignUp = isAuthenticated ? false : true;

  return (
    <div className="flex flex-col mx-auto min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 relative overflow-hidden">
      {<Navbar didntSignUp={didntSignUp} />}
      <BoundaryWithSuspense>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={!isAuthenticated && !didntSignUp ? <LoginPage /> : <Standings />} />
          <Route path="/predictor" element={!isAuthenticated && !didntSignUp ? <LoginPage /> : <Predictor />} />
          <Route path="/playoff" element={!isAuthenticated && !didntSignUp ? <LoginPage /> : <Playoff />} />
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
        </Routes>
      </BoundaryWithSuspense>
      <Toaster />
    </div>
  );
}

export default App;
