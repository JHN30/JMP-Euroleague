import { useState } from "react";
import Input from "../components/common/Input";
import { FaArrowLeft } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import LayoutShell, { authCardClass } from "../components/layout/LayoutShell";

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
    <LayoutShell maxWidth="max-w-xl">
      <div
        className={`${authCardClass} overflow-hidden`}
      >
        <div className="px-6 py-8 sm:px-10">
          <div className="mb-6 text-center flex flex-col items-center">
            <h2 className="mt-6 text-3xl font-bold text-slate-100">Forgot your password?</h2>
            <p className="mt-2 text-sm text-slate-400">We'll email you a secure reset link.</p>
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
              <button
                className="button mt-2 w-full justify-center transition-transform active:scale-[0.98] hover:scale-[1.02]"
                type="submit"
              >
                {isLoading ? <FiLoader className="size-6 animate-spin mx-auto" /> : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-400 animate-[pulse_2s_ease-in-out_infinite]"
              >
                <LuMail className="h-8 w-8 text-white" />
              </div>
              <p className="mt-4 text-slate-300">
                If an account exists for {email}, you will receive a password reset link shortly.
              </p>
            </div>
          )}
        </div>

        <div className="bg-slate-900/50 px-8 py-5 text-center text-sm text-slate-400">
          <Link to={"/login"} className="flex items-center justify-center text-orange-400 transition-colors hover:text-orange-300">
            <FaArrowLeft className="mr-2 h-4 w-4" /> Back to Login
          </Link>
        </div>
      </div>
    </LayoutShell>
  );
};
export default ForgotPasswordPage;
