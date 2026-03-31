import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../hooks/useAuth";
import { formatDate } from "../utils/date";
import LayoutShell, { layoutCardClass } from "../components/layout/LayoutShell";

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

  const handleVerifyEmail = async () => {
    try {
      await newVerifyEmail();
      navigate("/verify-email");
      toast.success("Verification email sent");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <LayoutShell>
        <div className={`${layoutCardClass} flex min-h-[40vh] items-center justify-center px-6 py-8 text-slate-200`}>
          Loading profile...
        </div>
      </LayoutShell>
    );
  }

  const isVerified = Boolean(user.isVerified);
  const isAdmin = user.role === "admin";
  const actionLabel = isVerified ? (isAdmin ? "Go to Admin Dashboard" : "Logout") : "Resend Verification Email";
  const actionHandler = isVerified ? (isAdmin ? handleAdmin : handleLogout) : handleVerifyEmail;

  return (
    <LayoutShell>
      <div className="flex flex-col gap-6 pt-4 text-white">
        <header className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-400/90">JMP Profile</p>
          <h1 className="text-3xl font-bold leading-tight text-slate-100">Account Center</h1>
        </header>

        <section className={`${layoutCardClass} overflow-hidden`} aria-labelledby="profile-overview-title">
          <div className="border-b border-white/10 px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">Profile overview</p>
                <h2 id="profile-overview-title" className="mt-2 text-2xl font-semibold text-slate-100">
                  Welcome, {user.username}
                </h2>
                <p className="mt-1 text-sm text-slate-300">Account details and options.</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                Status:{" "}
                <span className={`font-semibold ${isVerified ? "text-emerald-400" : "text-orange-300"}`}>
                  {isVerified ? "Verified" : "Awaiting verification"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6 sm:py-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-base font-semibold text-orange-200">Profile information</h3>
              <div className="mt-3 space-y-2 text-sm text-slate-200">
                <p>
                  <span className="text-slate-400">Email:</span> {user.email}
                </p>
                <p>
                  <span className="text-slate-400">Role:</span> {isAdmin ? "Admin" : "User"}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-base font-semibold text-orange-200">Account activity</h3>
              <div className="mt-3 space-y-2 text-sm text-slate-200">
                <p>
                  <span className="text-slate-400">Joined:</span>{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>
                  <span className="text-slate-400">Last login:</span> {formatDate(user.lastLogin)}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 px-5 py-5 sm:px-6 sm:py-6">
            <button
              onClick={actionHandler}
              className="w-full rounded-lg border border-orange-300/50 bg-orange-500/20 px-4 py-3 text-sm font-semibold text-orange-100 transition-colors hover:border-orange-300/70 hover:bg-orange-500/30"
            >
              {actionLabel}
            </button>
          </div>
        </section>
      </div>
    </LayoutShell>
  );
};

export default ProfilePage;
