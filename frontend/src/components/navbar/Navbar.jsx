import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";

import logoPng from "../../../assets/Logo.png";

import NavbarLogo from "./NavbarLogo";
import NavbarDesktopMenu from "./NavbarDesktopMenu";
import NavbarMobileMenu from "./NavbarMobileMenu";
import NavbarMobileToggle from "./NavbarMobileToggle";
import { getNavbarMenuItems } from "./menuItems";

import { useAuth } from "../../hooks/useAuth";

const Navbar = ({ isGuest, isCheckingAuth }) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  const isAuthRoute = pathname === "/login" || pathname === "/signup";

  const menuItems = getNavbarMenuItems({ isAuthenticated, isGuest, isCheckingAuth, user });

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
    <>
      <header className="sticky top-0 z-100 w-full border-b border-white/5 bg-slate-900/95 shadow-lg shadow-slate-950/20">
        <div className="mx-auto flex w-full max-w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

          <NavbarLogo logoSrc={logoPng} />

          <NavbarDesktopMenu
            menuItems={menuItems}
            pathname={pathname}
            isAuthRoute={isAuthRoute}
            isAuthenticated={isAuthenticated}
            isCheckingAuth={isCheckingAuth}
            onLogout={handleLogout}
            onLogin={handleLogin}
          />

          <NavbarMobileToggle isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </header>

      <NavbarMobileMenu
        isOpen={isMenuOpen}
        menuItems={menuItems}
        pathname={pathname}
        isAuthRoute={isAuthRoute}
        isAuthenticated={isAuthenticated}
        isCheckingAuth={isCheckingAuth}
        onLogout={handleLogout}
        onLogin={handleLogin}
        onClose={closeMenu}
      />
    </>
  );
};

export default Navbar;
