import { HiMenu, HiX } from "react-icons/hi";

const NavbarMobileToggle = ({ isOpen, onToggle }) => {
  return (
    <div className="flex items-center lg:hidden">
      <button onClick={onToggle} className="navbar-mobile-toggle" aria-label="Toggle navigation menu">
        {isOpen ? <HiX className="h-7 w-7" /> : <HiMenu className="h-7 w-7" />}
      </button>
    </div>
  );
};

export default NavbarMobileToggle;
