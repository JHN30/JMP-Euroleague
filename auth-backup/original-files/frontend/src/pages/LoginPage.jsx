import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { Link } from "react-router-dom";
import Input from "../components/common/Input";
import LayoutShell, { authCardClass } from "../components/layout/LayoutShell";
import { useAuth } from "../hooks/useAuth";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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
    <LayoutShell maxWidth="max-w-xl">
      <motion.div
        className={`${authCardClass} px-6 py-8 sm:px-10`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="mb-6 text-center text-3xl font-bold text-slate-100">Welcome back</h2>

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
            <Link to="/forgot-password" className="text-slate-400 transition-colors hover:text-orange-400">
              Forgot password?
            </Link>
          </div>
          {error && <p className="text-sm font-semibold text-red-400">{error}</p>}

          <button
            className="button mt-2 w-full justify-center transition-transform active:scale-[0.98] hover:scale-[1.02]"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <FiLoader className="mx-auto h-6 w-6 animate-spin" /> : "Login"}
          </button>
        </form>

        <div className="mt-4 rounded-2xl border border-white/5 bg-slate-800/30 p-4 text-center text-sm text-slate-300">
          Need an account?
          <Link to="/signup" className="ml-2 font-semibold text-orange-400 transition-colors hover:text-orange-300">
            Sign up
          </Link>
        </div>
      </motion.div>
    </LayoutShell>
  );
};
export default LoginPage;
