//eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import Input from "../components/Input";
import { FiLoader, FiUser } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuth } from "../func/useAuth";

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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-neutral backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-amber-400 text-transparent bg-clip-text">
            Create Account
          </h2>

          <form onSubmit={handleSignUp}>
            <Input icon={FiUser} type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
            <Input
              icon={LuMail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              icon={FaLock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
            <PasswordStrengthMeter password={password} />

            <motion.button
              className="button mt-5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <FiLoader className=" animate-spin mx-auto" size={24} /> : "Sign Up"}
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to={"/login"} className="text-orange-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
