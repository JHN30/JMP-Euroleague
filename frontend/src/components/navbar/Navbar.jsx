import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";

import logoPng from "../../../assets/Logo.png";

import "../../styles/navbar.css";

import NavbarLogo from "./NavbarLogo";
import NavbarDesktopMenu from "./NavbarDesktopMenu";
import NavbarMobileMenu from "./NavbarMobileMenu";
import NavbarMobileToggle from "./NavbarMobileToggle";
import { getNavbarMenuItems } from "./menuItems";

import { useAuth } from "../../hooks/useAuth";

const Navbar = ({ isGuest }) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  const isAuthRoute = pathname === "/login" || pathname === "/signup";

  const menuItems = getNavbarMenuItems({ isAuthenticated, isGuest, user });

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
      <div className="navbar-container">
        <div className="navbar-highlight" />

        <NavbarLogo logoSrc={logoPng} />

        <NavbarDesktopMenu
          menuItems={menuItems}
          pathname={pathname}
          isAuthRoute={isAuthRoute}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          onLogin={handleLogin}
        />

        <NavbarMobileToggle isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
      </div>

      <NavbarMobileMenu
        isOpen={isMenuOpen}
        menuItems={menuItems}
        pathname={pathname}
        isAuthRoute={isAuthRoute}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onLogin={handleLogin}
        onClose={closeMenu}
      />
    </header>
  );
};

export default Navbar;
