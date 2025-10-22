import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useCallback} from "react";

import Navbar from "./components/Navbar";
import { useAuth } from "./hooks/useAuth";
import LoadingSpinner from "./components/common/LoadingSpinner";

import StandingsPage from "./pages/StandingsPage";
import PredictorPage from "./pages/PredictorPage";
import PlayoffPage from "./pages/PlayoffPage";
import TeamsPage from "./pages/TeamsPage";
import TeamStatsPage from "./pages/TeamStatsPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificatonPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminPage from "./pages/AdminPage";


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
        </Routes>
      <Toaster />
    </div>
  );
}

export default App;
