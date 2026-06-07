import { Link } from "react-router-dom";

const NavbarMenuItem = ({ item, pathname, onClick, layoutClassName }) => {
  const isActive = pathname === item.to;

  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={`group flex items-center rounded-lg text-sm font-medium uppercase tracking-wider transition-all duration-200 ${layoutClassName} ${
        isActive ? "bg-slate-700/80 text-white font-bold" : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
      }`}
    >
      <item.icon
        aria-hidden="true"
        className={`h-5 w-5 transition-colors duration-200 ${
          isActive ? "text-orange-400" : "text-orange-400/90 group-hover:text-orange-400"
        }`}
      />
      <span className="font-semibold">{item.label}</span>
    </Link>
  );
};

export default NavbarMenuItem;
