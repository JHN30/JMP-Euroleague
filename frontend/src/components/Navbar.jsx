import { Link, useLocation } from "react-router-dom";

import { PiRankingFill } from "react-icons/pi";
import { MdOnlinePrediction } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";

import logoPng from "../../assets/Logo.png";

import { useAuth } from "../func/useAuth";

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;

  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
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
          {isAuthenticated && user.isVerified && (
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
          {isAuthenticated && (
            <li className="flex justify-center">
              <button
                onClick={handleLogout}
                className="flex gap-3 items-center py-3 px-4 bg-gradient-to-r from-orange-400 to-amber-400 text-white font-bold rounded-lg shadow-lg hover:from-orange-500 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              >
                <LuLogOut className={`w-5 h-5 text-white`} />
                <span className={`text-lg hidden md:block`}>Logout</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
