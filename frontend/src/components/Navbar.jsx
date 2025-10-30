import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "react-hot-toast";
import { useState } from "react";

import { PiRankingFill } from "react-icons/pi";
import { MdOnlinePrediction } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { RiTeamFill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";

import logoPng from "../../assets/Logo.png";

import { useAuth } from "../hooks/useAuth";

const Navbar = ({ didntSignUp }) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  const isAuthRoute = pathname === "/login" || pathname === "/signup";

  const menuItems = [
    {
      to: "/",
      icon: PiRankingFill,
      label: "Standings",
      show: true,
    },
    {
      to: "/predictor",
      icon: MdOnlinePrediction,
      label: "Predictor",
      show: true,
    },
    {
      to: "/playoff",
      icon: FaTrophy,
      label: "Playoff",
      show: true,
    },
    {
      to: "/teams",
      icon: RiTeamFill,
      label: "Teams",
      show: true,
    },
    {
      to: "/profile",
      icon: CgProfile,
      label: user?.username || "Profile",
      show: isAuthenticated && !didntSignUp,
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
    toast.success("You logged out successfully");
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-3 py-4 sm:px-6">
      <div className="relative mx-auto flex w-full items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-3 py-3 shadow-lg shadow-slate-950/40 backdrop-blur-2xl lg:px-6">
        <div className="pointer-events-none absolute inset-x-6 -top-1 h-0.5 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />

        {/* Logo */}
        <Link
          to="/"
          className="group relative flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-2 py-1 shadow transition shadow-orange-400/40 duration-200 hover:border-orange-400/80"
        >
          <div className="relative flex h-11 w-22 items-center justify-center overflow-hidden rounded-xl">
            <img src={logoPng} className="relative z-10 h-10 w-20 object-contain" alt="JMP Euroleague logo" />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-1 lg:flex">
          {menuItems.map(
            (item) =>
              item.show && (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-200 ${
                      pathname === item.to
                        ? "bg-white/10 text-white shadow-inner"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon className={`h-5 w-5 ${pathname === item.to ? "text-orange-300" : "text-gray-400"}`} />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                </li>
              )
          )}
          {!isAuthRoute && (
            <li>
              <motion.button
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={isAuthenticated ? handleLogout : handleLogin}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
              >
                <LuLogOut className="h-5 w-5" />
                {isAuthenticated ? "Logout" : "Login"}
              </motion.button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-xl border border-white/10 p-2 text-orange-300 transition hover:border-orange-300 hover:text-orange-200"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <HiX className="h-7 w-7" /> : <HiMenu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />

            {/* Mobile Menu */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 z-50 flex h-full w-72 flex-col border-l border-white/10 bg-slate-950/95 backdrop-blur-xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-orange-200">Menu</p>
                <button
                  onClick={closeMenu}
                  className="rounded-full border border-white/10 p-2 text-gray-200 hover:border-orange-300 hover:text-orange-200"
                  aria-label="Close navigation menu"
                >
                  <HiX className="h-5 w-5" />
                </button>
              </div>

              <ul className="flex-1 space-y-2 overflow-y-auto px-5 py-6">
                {menuItems.map(
                  (item) =>
                    item.show && (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={closeMenu}
                          className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                            pathname === item.to
                              ? "border-orange-400/60 bg-white/5 text-white"
                              : "border-white/5 text-gray-300 hover:border-white/15 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <item.icon className={`h-5 w-5 ${pathname === item.to ? "text-orange-300" : "text-gray-400"}`} />
                          {item.label}
                        </Link>
                      </li>
                    )
                )}
              </ul>

              {!isAuthRoute && (
                <div className="border-t border-white/10 px-5 py-4">
                  <button
                    onClick={isAuthenticated ? handleLogout : handleLogin}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/40"
                  >
                    <LuLogOut className="h-5 w-5" />
                    {isAuthenticated ? "Logout" : "Login"}
                  </button>
                </div>
              )}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
