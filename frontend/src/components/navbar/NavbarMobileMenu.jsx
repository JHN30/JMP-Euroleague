import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";

const NavbarMobileMenu = ({
  isOpen,
  menuItems,
  pathname,
  isAuthRoute,
  isAuthenticated,
  onLogout,
  onLogin,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />

          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="navbar-mobile-panel lg:hidden"
          >
            <div className="navbar-mobile-header">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-orange-200">Menu</p>
              <button onClick={onClose} className="navbar-mobile-close" aria-label="Close navigation menu">
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
                        onClick={onClose}
                        className={`navbar-mobile-link ${pathname === item.to ? "navbar-mobile-link--active" : ""}`}
                      >
                        <item.icon className="navbar-menu-icon" />
                        {item.label}
                      </Link>
                    </li>
                  )
              )}
            </ul>

            {!isAuthRoute && (
              <div className="border-t border-white/10 px-5 py-4">
                <button onClick={isAuthenticated ? onLogout : onLogin} className="navbar-mobile-cta">
                  <LuLogOut className="h-5 w-5" />
                  {isAuthenticated ? "Logout" : "Login"}
                </button>
              </div>
            )}
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default NavbarMobileMenu;
