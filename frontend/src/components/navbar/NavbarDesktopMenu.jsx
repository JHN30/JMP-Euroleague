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
                className={`navbar-menu-link ${pathname === item.to ? "navbar-menu-link--active" : ""}`}
              >
                <item.icon className="navbar-menu-icon" />
                <span className="navbar-menu-label">{item.label}</span>
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
            onClick={isAuthenticated ? onLogout : onLogin}
            className="navbar-cta-button"
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
