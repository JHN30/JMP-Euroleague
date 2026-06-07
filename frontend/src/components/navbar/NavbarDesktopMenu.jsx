import NavbarMenuItem from "./NavbarMenuItem";

const NavbarDesktopMenu = ({ menuItems, pathname }) => {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {menuItems.map(
          (item) =>
            item.show && (
              <li key={item.to}>
                <NavbarMenuItem item={item} pathname={pathname} layoutClassName="px-3 py-2" />
              </li>
            )
        )}
      </ul>
    </nav>
  );
};

export default NavbarDesktopMenu;
