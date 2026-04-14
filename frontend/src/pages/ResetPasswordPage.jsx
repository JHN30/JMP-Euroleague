import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/common/Input";
import { FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import LayoutShell, { authCardClass } from "../components/layout/LayoutShell";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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
    <LayoutShell maxWidth="max-w-xl">
      <motion.div
        className={`${authCardClass} px-6 py-8 sm:px-10`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6 text-center flex flex-col items-center">
          <h2 className="mt-6 text-3xl font-bold text-slate-100">Create a new password</h2>
          <p className="mt-2 text-sm text-slate-400">Make sure it's strong and unique.</p>
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

          <button
            className="button mt-2 w-full justify-center transition-transform active:scale-[0.98] hover:scale-[1.02]"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </button>
        </form>
      </motion.div>
    </LayoutShell>
  );
};
export default ResetPasswordPage;
