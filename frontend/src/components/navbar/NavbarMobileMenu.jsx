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
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[110] bg-black/75 lg:hidden"
      />

      <nav className="fixed top-0 right-0 z-[120] flex h-[100dvh] w-72 flex-col border-l border-white/10 bg-slate-950/95 shadow-2xl lg:hidden">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">Menu</p>
          <button
            onClick={onClose}
            className="rounded-xl border border-transparent p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="Close navigation menu"
          >
            <HiX className="h-5 w-5" />
          </button>
        </div>

        <ul className="flex-1 space-y-2 overflow-y-auto overscroll-contain px-5 py-6">
          {menuItems.map(
            (item) =>
              item.show && (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className={`group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-200 ${
                      pathname === item.to
                        ? "bg-slate-700/80 text-white font-bold"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 transition-colors duration-200 ${
                        pathname === item.to ? "text-orange-400" : "text-orange-400/90 group-hover:text-orange-400"
                      }`}
                    />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                </li>
              )
          )}
        </ul>

        {!isAuthRoute && (
          <div className="border-t border-white/10 px-5 py-4">
            <button
              onClick={isAuthenticated ? onLogout : onLogin}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition duration-200 hover:bg-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <LuLogOut className="h-5 w-5" />
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavbarMobileMenu;
