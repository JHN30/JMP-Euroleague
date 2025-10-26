//eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { formatDate } from "../utils/date";
import { useNavigate } from "react-router-dom";

import "../styles/button.css";
import toast from "react-hot-toast";
import PageShell, { pageCardClass } from "../components/layout/PageShell";

const ProfilePage = () => {
  const { user, logout, newVerifyEmail } = useAuth();
  const navigate = useNavigate();

  const handleAdmin = async () => {
    navigate("/admin-dashboard");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    toast.success("You logged out successfully");
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    try {
      await newVerifyEmail();
      navigate("/verify-email");
      console.log("Email sent successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${pageCardClass} px-6 py-8 sm:px-10 text-white`}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-orange-300/80">Profile</p>
            <h2 className="text-3xl font-bold">Welcome, {user.username}</h2>
            <p className="text-sm text-gray-300">See your account details.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 px-5 py-3 text-sm text-gray-300">
            Status:{" "}
            <span className={`font-semibold ${user.isVerified ? "text-emerald-400" : "text-orange-300"}`}>
              {user.isVerified ? "Verified" : "Awaiting verification"}
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-orange-300">Profile information</h3>
            <div className="mt-4 space-y-2 text-sm text-gray-200">
              <p>
                <span className="text-gray-400">Email:</span> {user.email}
              </p>
              <p>
                <span className="text-gray-400">Role:</span> {user.role === "admin" ? "Admin" : "User"}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-orange-300">Account activity</h3>
            <div className="mt-4 space-y-2 text-sm text-gray-200">
              <p>
                <span className="text-gray-400">Joined:</span>{" "}
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <span className="text-gray-400">Last login:</span> {formatDate(user.lastLogin)}
              </p>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={user.isVerified ? (user.role === "admin" ? handleAdmin : handleLogout) : handleVerifyEmail}
            className="button w-full justify-center"
          >
            {user.isVerified ? (user.role === "admin" ? "Go to Admin Dashboard" : "Logout") : "Resend Verification Email"}
          </motion.button>
        </motion.div>
      </motion.div>
    </PageShell>
  );
};

export default ProfilePage;
