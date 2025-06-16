import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";

import Standings from "./pages/Standings";
import Predictor from "./pages/Predictor";
import Playoff from "./pages/Playoff";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
// import EmailVerificatonPage from "./pages/EmailVerificatonPage";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import ResetPasswordPage from "./pages/ResetPasswordPage";

import { useAuth } from "./func/useAuth";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />;
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-auto min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 relative overflow-hidden">
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={!isAuthenticated ? <LoginPage /> : <Standings />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/predictor" element={!isAuthenticated ? <LoginPage /> : <Predictor />} />
        <Route path="/playoff" element={!isAuthenticated ? <LoginPage /> : <Playoff />} />
        <Route path="/profile" element={!isAuthenticated ? <LoginPage /> : <ProfilePage />} />
        {/* <Route path="verify-email" element={isAuthenticated ? <EmailVerificatonPage /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/" /> : <ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={isAuthenticated ? <Navigate to="/" /> : <ResetPasswordPage />} /> */}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
