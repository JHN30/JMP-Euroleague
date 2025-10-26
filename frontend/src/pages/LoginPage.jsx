//eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { Link } from "react-router-dom";
import Input from "../components/common/Input";
import AuthShell, { authCardClass } from "../components/layout/AuthShell";
import { useAuth } from "../hooks/useAuth";

import "../styles/button.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <AuthShell maxWidth="max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${authCardClass} px-6 py-8 sm:px-10`}
      >
        <div className="mb-8 text-center">
          <span className="inline-flex items-center rounded-full border border-orange-500/30 px-3 py-1 text-md font-semibold uppercase tracking-wide text-orange-300/80">
            Login
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white">Welcome back</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-2">
          <Input
            icon={LuMail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            icon={FaLock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="mb-2 flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="text-orange-400 hover:text-orange-300 hover:underline">
              Forgot password?
            </Link>
          </div>
          {error && <p className="text-sm font-semibold text-red-400">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="button mt-4 w-full justify-center"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <FiLoader className="mx-auto h-6 w-6 animate-spin" /> : "Login"}
          </motion.button>
        </form>

        <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-4 text-center text-sm text-gray-300">
          Need an account?
          <Link to="/signup" className="ml-1 font-semibold text-orange-300 hover:text-orange-200">
            Sign up
          </Link>
        </div>
      </motion.div>
    </AuthShell>
  );
};
export default LoginPage;
