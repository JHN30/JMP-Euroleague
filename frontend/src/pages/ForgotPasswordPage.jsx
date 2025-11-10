//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import Input from "../components/common/Input";
import { FaArrowLeft } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import AuthShell, { authCardClass } from "../components/layout/AuthShell";

import "../styles/button.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <AuthShell maxWidth="max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${authCardClass} overflow-hidden`}
      >
        <div className="px-6 py-8 sm:px-10">
          <div className="mb-6 text-center">
            <span className="inline-flex items-center rounded-full border border-orange-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-300/80">
              Reset access
            </span>
            <h2 className="mt-4 text-3xl font-bold text-white">Forgot your password?</h2>
            <p className="mt-1 text-sm text-gray-300">We'll email you a secure reset link.</p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                icon={LuMail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="button w-full justify-center"
                type="submit"
              >
                {isLoading ? <FiLoader className="size-6 animate-spin mx-auto" /> : "Send Reset Link"}
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-400"
              >
                <LuMail className="h-8 w-8 text-white" />
              </motion.div>
              <p className="text-gray-300">
                If an account exists for {email}, you will receive a password reset link shortly.
              </p>
            </div>
          )}
        </div>

        <div className="bg-black/40 px-8 py-4 text-center text-sm text-gray-300">
          <Link to={"/login"} className="flex items-center justify-center text-orange-400 hover:text-orange-300">
            <FaArrowLeft className="mr-2 h-4 w-4" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </AuthShell>
  );
};
export default ForgotPasswordPage;
