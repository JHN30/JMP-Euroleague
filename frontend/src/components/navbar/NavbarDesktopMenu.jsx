import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { LuLogOut } from "react-icons/lu";

const NavbarDesktopMenu = ({ menuItems, pathname, isAuthRoute, isAuthenticated, onLogout, onLogin }) => {
  return (
    <ul className="hidden items-center gap-1 lg:flex">
      {menuItems.map(
        (item) =>
          item.show && (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-200 ${
                  pathname === item.to
                    ? "bg-slate-700/80 text-white font-bold"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 transition-colors duration-200 ${
                    pathname === item.to ? "text-orange-400" : "text-orange-400/90 group-hover:text-orange-400"
                  }`}
                />
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={isAuthenticated ? onLogout : onLogin}
            className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition duration-200 hover:bg-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            <LuLogOut className="h-5 w-5" />
            {isAuthenticated ? "Logout" : "Login"}
          </motion.button>
        </li>
      )}
    </ul>
  );
};

export default NavbarDesktopMenu;
