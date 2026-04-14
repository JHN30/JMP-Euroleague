import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import LayoutShell, { authCardClass } from "../components/layout/LayoutShell";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import "../styles/button.css";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail, user } = useAuth();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <LayoutShell maxWidth="max-w-xl">
      <motion.div
        className={`${authCardClass} px-6 py-8 sm:px-10`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-6 text-center flex flex-col items-center">
          <h2 className="mt-6 text-3xl font-bold text-slate-100">Verify your email</h2>
          <p className="mt-2 text-sm text-slate-400">Enter the 6-digit code we sent to your inbox.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="flex justify-between gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="6"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-12 w-12 rounded-xl border border-white/10 bg-slate-800/50 text-center text-2xl font-bold text-slate-200 shadow-sm transition-all duration-200 focus:border-orange-400 focus:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-orange-400/10"
              />
            ))}
          </div>
          {error && <p className="text-red-400 text-sm font-semibold">{error}</p>}
          <button
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="button w-full justify-center disabled:opacity-60 transition-transform active:scale-[0.98] hover:scale-[1.02]"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </motion.div>
    </LayoutShell>
  );
};
export default EmailVerificationPage;
