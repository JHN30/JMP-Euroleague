import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";

import Standings from "./pages/Standings";
import Predictor from "./pages/Predictor";
import Playoff from "./pages/Playoff";
import TeamsPage from "./pages/TeamsPage";
import TeamStatsPage from "./pages/TeamStatsPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import EmailVerificatonPage from "./pages/EmailVerificatonPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminPage from "./pages/AdminPage";

import { useAuth } from "./func/useAuth";
import { useEffect, useCallback } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuth();
  const checkAuthCallback = useCallback(checkAuth, [checkAuth]);
  let didntSignUp = true;

  useEffect(() => {
    checkAuthCallback();
  }, [checkAuthCallback]);

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
      <Routes>
        {/*Main Pages that are in Navbar with all its subpages*/}

        <Route path="/" element={!isAuthenticated && !didntSignUp ? <LoginPage /> : <Standings />} />
        <Route path="/predictor" element={!isAuthenticated && !didntSignUp ? <LoginPage /> : <Predictor />} />
        <Route path="/playoff" element={!isAuthenticated && !didntSignUp ? <LoginPage /> : <Playoff />} />
        <Route path="/teams" element={!isAuthenticated && !didntSignUp ? <LoginPage /> : <TeamsPage />} />
        <Route path="/team-stats/:teamId" element={!isAuthenticated && !didntSignUp ? <LoginPage /> : <TeamStatsPage />} />
        <Route path="/profile" element={!isAuthenticated ? <LoginPage /> : <ProfilePage />} />

        {/*Pages for signup, login, reset password, email verification (auth pages)*/}

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

        {/*Pages for admin*/}

        <Route
          path="/admin-dashboard"
          element={isAuthenticated && !didntSignUp && user?.role === "admin" ? <AdminPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
