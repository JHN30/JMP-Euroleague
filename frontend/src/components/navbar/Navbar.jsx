import { useLocation } from "react-router-dom";
import { useState } from "react";

import NavbarLogo from "./NavbarLogo";
import NavbarDesktopMenu from "./NavbarDesktopMenu";
import NavbarMobileMenu from "./NavbarMobileMenu";
import NavbarMobileToggle from "./NavbarMobileToggle";
import { getNavbarMenuItems } from "./menuItems";

const NAVBAR_LOGO_SRC = "/android-chrome-192x192.png";

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = getNavbarMenuItems();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-100 w-full border-b border-white/5 bg-slate-900/95 shadow-lg shadow-slate-950/20">
        <div className="mx-auto flex w-full max-w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <NavbarLogo logoSrc={NAVBAR_LOGO_SRC} />

          <NavbarDesktopMenu
            menuItems={menuItems}
            pathname={pathname}
          />

          <NavbarMobileToggle isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </header>

      <NavbarMobileMenu
        isOpen={isMenuOpen}
        menuItems={menuItems}
        pathname={pathname}
        onClose={closeMenu}
      />
    </>
  );
};

export default Navbar;
