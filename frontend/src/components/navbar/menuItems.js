import { PiRankingFill } from "react-icons/pi";
import { MdOnlinePrediction } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiTeamFill } from "react-icons/ri";

export const getNavbarMenuItems = ({ isAuthenticated, didntSignUp, user }) => [
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
