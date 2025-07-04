import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";

import { PiRankingFill } from "react-icons/pi";
import { MdOnlinePrediction } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { RiTeamFill } from "react-icons/ri";

import logoPng from "../../assets/Logo.png";

import { useAuth } from "../func/useAuth";

const Navbar = ({ didntSignUp }) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
    toast.success("You logged out successfully");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-18 max-h-24">
      <div className="sticky w-screen flex flex-row border-b-4 border-orange-400 h-18 md:w-full justify-between">
        <Link to="/" className="flex flex-none items-center justify-center ml-4">
          <img src={logoPng} className="w-32 h-16" />
        </Link>
        <ul className="flex flex-row items-center justify-center ml-auto mr-4">
          <li className="flex justify-center">
            <Link
              to="/"
              className={`flex gap-3 items-center rounded-full py-2 pl-2 pr-4 max-w-fit cursor-pointer ${
                pathname === "/" ? "font-bold" : "font-normal"
              }`}
            >
              <PiRankingFill className={`w-6 h-6 ${pathname === "/" ? "text-orange-400" : ""}`} />
              <span className={`text-lg hidden md:block ${pathname === "/" ? "font-bold" : "font-normal"}`}>Standings</span>
            </Link>
          </li>
          <li className="flex justify-center">
            <Link
              to="/predictor"
              className={`flex gap-3 items-center rounded-full py-2 pl-2 pr-4 max-w-fit cursor-pointer ${
                pathname === "/predictor" ? "font-bold" : "font-normal"
              }`}
            >
              <MdOnlinePrediction className={`w-7 h-7 ${pathname === "/predictor" ? "text-orange-400" : ""}`} />
              <span className={`text-lg hidden md:block ${pathname === "/predictor" ? "font-bold" : "font-normal"}`}>
                Predictor
              </span>
            </Link>
          </li>
          <li className="flex justify-center">
            <Link
              to="/playoff"
              className={`flex gap-3 items-center rounded-full py-2 pl-2 pr-4 max-w-fit cursor-pointer ${
                pathname === "/playoff" ? "font-bold" : "font-normal"
              }`}
            >
              <FaTrophy className={`w-5 h-5 ${pathname === "/playoff" ? "text-orange-400" : ""}`} />
              <span className={`text-lg hidden md:block ${pathname === "/playoff" ? "font-bold" : "font-normal"}`}>
                Playoff
              </span>
            </Link>
          </li>
          <li className="flex justify-center">
            <Link
              to="/teams"
              className={`flex gap-3 items-center rounded-full py-2 pl-2 pr-4 max-w-fit cursor-pointer ${
                pathname === "/teams" ? "font-bold" : "font-normal"
              }`}
            >
              <RiTeamFill className={`w-5 h-5 ${pathname === "/teams" ? "text-orange-400" : ""}`} />
              <span className={`text-lg hidden md:block ${pathname === "/teams" ? "font-bold" : "font-normal"}`}>Teams</span>
            </Link>
          </li>
          {isAuthenticated && !didntSignUp && (
            <li className="flex justify-center">
              <Link
                to="/profile"
                className={`flex gap-3 items-center rounded-full py-2 pl-2 pr-4 max-w-fit cursor-pointer ${
                  pathname === "/profile" ? "font-bold" : "font-normal"
                }`}
              >
                <CgProfile className={`w-5 h-5 ${pathname === "/profile" ? "text-orange-400" : ""}`} />
                <span className={`text-lg hidden md:block`}>{user.username}</span>
              </Link>
            </li>
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
                <span className={`text-lg hidden md:block`}>{isAuthenticated ? "Logout" : "Login"}</span>
              </motion.button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
