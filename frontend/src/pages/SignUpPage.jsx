//eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import Input from "../components/common/Input";
import { FiLoader, FiUser } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/features/PasswordStrengthMeter";
import { useAuth } from "../hooks/useAuth";
import AuthShell, { authCardClass } from "../components/layout/AuthShell";

import "../styles/button.css";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, name);
      navigate("/verify-email");
      console.log("Sign up successful");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthShell maxWidth="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${authCardClass} flex justify-center flex-col`}
      >
        {/* Left Side Content (Why Join) - Will be implemented in future */}
        {/* <div className="hidden flex-col justify-between border-r border-white/5 bg-gradient-to-br from-black/40 via-slate-900/70 to-black/40 p-10 text-white/90 md:flex">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-orange-300/80">Why join</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white">Unlock the full JMP Euroleague toolkit</h2>
            <p className="mt-4 text-sm text-white/70">
              Gain access to advanced prediction dashboards, live rating adjustments, and editorial control over every team
              profile.
            </p>
          </div>
          <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-5">
            <p className="text-sm font-semibold text-white">You will be able to:</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                Publish and manage team data in seconds.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                Trigger rating recalculations after every round.
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                Collaborate safely with role-based permissions.
              </li>
            </ul>
          </div>
        </div> */}

        <div className="p-4 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="inline-flex items-center rounded-full border border-orange-500/30 px-3 py-1 text-md font-semibold uppercase tracking-wide text-orange-300">
              Create account
            </h1>
            <h3 className="mt-1 text-sm text-gray-300">Enter your details to get verified access.</h3>
          </div>

          <form onSubmit={handleSignUp} className="space-y-2">
            <Input
              icon={FiUser}
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <PasswordStrengthMeter password={password} />
            {error && <p className="text-red-500 font-semibold">{error}</p>}

            <motion.button
              className="button mt-4 w-full justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <FiLoader className="mx-auto animate-spin" size={24} /> : "Sign Up"}
            </motion.button>
          </form>

          <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-center text-sm text-gray-300">
            Already verified?
            <Link to={"/login"} className="ml-1 font-semibold text-orange-300 hover:text-orange-200">
              Log in
            </Link>
          </div>
        </div>
      </motion.div>
    </AuthShell>
  );
};

export default SignUpPage;
