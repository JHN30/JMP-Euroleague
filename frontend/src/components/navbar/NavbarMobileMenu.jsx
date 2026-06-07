import { HiX } from "react-icons/hi";

import NavbarMenuItem from "./NavbarMenuItem";

const NavbarMobileMenu = ({
  isOpen,
  menuItems,
  pathname,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[110] bg-black/75 lg:hidden"
      />

      <nav
        aria-label="Primary"
        className="fixed top-0 right-0 z-120 flex h-dvh w-72 flex-col border-l border-white/10 bg-slate-950/95 shadow-2xl lg:hidden"
      >
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">Menu</p>
          <button
            onClick={onClose}
            className="rounded-xl border border-transparent p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="Close navigation menu"
          >
            <HiX className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <ul className="flex-1 space-y-2 overflow-y-auto overscroll-contain px-5 py-6">
          {menuItems.map(
            (item) =>
              item.show && (
                <li key={item.to}>
                  <NavbarMenuItem
                    item={item}
                    pathname={pathname}
                    onClick={onClose}
                    layoutClassName="gap-3 px-4 py-3"
                  />
                </li>
              )
          )}
        </ul>

      </nav>
    </>
  );
};

export default NavbarMobileMenu;
