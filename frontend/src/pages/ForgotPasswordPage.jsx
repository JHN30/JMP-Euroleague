//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import Input from "../components/Input";
import { FaArrowLeft } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useAuth } from "../func/useAuth";

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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-neutral backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 pb-2 text-center bg-gradient-to-r from-orange-400 to-amber-400 text-transparent bg-clip-text">
            Forgot Password
          </h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <p className="text-gray-300 mb-6 text-center">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <Input
                icon={LuMail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="button" type="submit">
                {isLoading ? <FiLoader className="size-6 animate-spin mx-auto" /> : "Send Reset Link"}
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <LuMail className="h-8 w-8 text-white" />
              </motion.div>
              <p className="text-gray-300 mb-6">
                If an account exists for {email}, you will receive a password reset link shortly.
              </p>
            </div>
          )}
        </div>

        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <Link to={"/login"} className="text-sm text-orange-400 hover:underline flex items-center">
            <FaArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
export default ForgotPasswordPage;
