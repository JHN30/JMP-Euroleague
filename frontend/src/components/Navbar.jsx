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

import { useAuth } from "../func/useAuth";

const Navbar = ({ didntSignUp }) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

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

  return (
    <div className="flex h-18 max-h-24">
      <div className="sticky w-screen flex flex-row border-b-4 border-orange-400 h-18 lg:w-full justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-none items-center justify-center ml-4">
          <img src={logoPng} className="w-32 h-16" alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex flex-row items-center justify-center ml-auto mr-4">
          {menuItems.map(
            (item) =>
              item.show && (
                <li key={item.to} className="flex justify-center">
                  <Link
                    to={item.to}
                    className={`flex gap-3 items-center rounded-full py-2 pl-2 pr-4 max-w-fit cursor-pointer ${
                      pathname === item.to ? "font-bold" : "font-normal"
                    }`}
                  >
                    <item.icon className={`w-6 h-6 ${pathname === item.to ? "text-orange-400" : ""}`} />
                    <span className={`text-lg ${pathname === item.to ? "font-bold" : "font-normal"}`}>{item.label}</span>
                  </Link>
                </li>
              )
          )}
          {pathname !== "/login" && pathname !== "/signup" && (
            <li className="flex justify-center">
              <motion.button
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={isAuthenticated ? handleLogout : handleLogin}
                className="flex gap-3 items-center py-3 px-4 bg-gradient-to-r from-orange-400 to-amber-400 text-white font-bold rounded-lg shadow-lg hover:from-orange-500 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              >
                <LuLogOut className={`w-5 h-5 text-white`} />
                <span className={`text-lg`}>{isAuthenticated ? "Logout" : "Login"}</span>
              </motion.button>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center mr-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-orange-400 hover:bg-gray-300/15 rounded-2xl focus:outline-none focus:text-orange-400 transition duration-200">
            {isMenuOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
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
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="lg:hidden fixed top-0 right-0 h-full w-64 bg-base-100 shadow-lg z-50 flex flex-col"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b-4 border-orange-500">
                <h2 className="text-lg font-bold text-white">Menu</h2>
                <button onClick={closeMenu} className="p-2 text-orange-400 hover:bg-gray-300/15 rounded-2xl focus:outline-none focus:text-orange-400 transition duration-200">
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 px-4 py-6">
                <ul className="space-y-4">
                  {menuItems.map(
                    (item) =>
                      item.show && (
                        <li key={item.to}>
                          <Link
                            to={item.to}
                            onClick={closeMenu}
                            className={`flex items-center gap-3 py-3 px-4 rounded-lg transition duration-200 ${
                              pathname === item.to
                                ? "bg-orange-100 text-orange-600 font-bold"
                                : "text-gray-300 hover:bg-gray-100/15"
                            }`}
                          >
                            <item.icon className={`w-5 h-5 ${pathname === item.to ? "text-orange-400" : ""}`} />
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              </nav>

              {/* Login/Logout Button */}
              {pathname !== "/login" && pathname !== "/signup" && (
                <div className="p-4 border-t-2 border-orange-500">
                  <button
                    onClick={isAuthenticated ? handleLogout : handleLogin}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-orange-400 to-amber-400 text-white font-bold rounded-lg shadow-lg hover:from-orange-500 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                  >
                    <LuLogOut className="w-5 h-5" />
                    <span>{isAuthenticated ? "Logout" : "Login"}</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
