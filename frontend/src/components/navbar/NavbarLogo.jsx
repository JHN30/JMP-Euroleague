import { Link } from "react-router-dom";

const NavbarLogo = ({ logoSrc }) => {
  return (
    <Link to="/" className="navbar-logo-link">
      <div className="navbar-logo-visual">
        <img src={logoSrc} className="relative z-10 h-10 w-20 object-contain" alt="JMP Euroleague logo" />
      </div>
    </Link>
  );
};

export default NavbarLogo;
