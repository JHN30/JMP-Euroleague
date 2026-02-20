import { HiMenu, HiX } from "react-icons/hi";

const NavbarMobileToggle = ({ isOpen, onToggle }) => {
  return (
    <div className="flex items-center lg:hidden">
      <button
        onClick={onToggle}
        className="rounded-xl border border-transparent p-2 text-orange-400 transition hover:bg-slate-700/50 hover:text-orange-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <HiX className="h-7 w-7" /> : <HiMenu className="h-7 w-7" />}
      </button>
    </div>
  );
};

export default NavbarMobileToggle;
