import { Link, useLocation } from "react-router-dom";

import { PiRankingFill } from "react-icons/pi";
import { MdOnlinePrediction } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";

import logoPng from "../../assets/Logo.png";

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="md:flex h-18 max-h-24">
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
            <Link to="/signup" className={`flex gap-3 items-center rounded-full py-2 pl-2 pr-4 max-w-fit cursor-pointer`}>
              <span className={`text-lg hidden md:block`}>Sign Up</span>
            </Link>
          </li>
          <li className="flex justify-center">
            <Link to="/login" className={`flex gap-3 items-center rounded-full py-2 pl-2 pr-4 max-w-fit cursor-pointer`}>
              <span className={`text-lg hidden md:block`}>Login</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
