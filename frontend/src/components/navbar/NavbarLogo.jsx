import { Link } from "react-router-dom";

const NavbarLogo = ({ logoSrc }) => {
  return (
    <Link
      to="/"
      className="relative flex items-center gap-3 rounded-2xl border border-transparent px-1 py-1 shadow-none transition duration-200 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
    >
      <div className="relative flex h-12 w-24 items-center justify-center overflow-hidden rounded-xl">
        <img src={logoSrc} className="relative z-10 h-12 w-24 object-contain" alt="JMP Euroleague Logo" />
      </div>
    </Link>
  );
};

export default NavbarLogo;
