//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/common/Input";
import { FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import AuthShell, { authCardClass } from "../components/layout/AuthShell";

import "../styles/button.css";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading, message } = useAuth();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password);

      toast.success("Password reset successfully, redirecting to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <AuthShell maxWidth="max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${authCardClass} px-6 py-8 sm:px-10`}
      >
        <div className="mb-6 text-center">
          <span className="inline-flex items-center rounded-full border border-orange-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-300/80">
            Final step
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white">Create a new password</h2>
          <p className="mt-1 text-sm text-gray-300">Make sure it’s strong and unique.</p>
        </div>
        {error && <p className="mb-2 text-sm font-semibold text-red-400">{error}</p>}
        {message && <p className="mb-2 text-sm font-semibold text-emerald-400">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            icon={FaLock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            icon={FaLock}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="button mt-4 w-full justify-center"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </motion.button>
        </form>
      </motion.div>
    </AuthShell>
  );
};
export default ResetPasswordPage;
