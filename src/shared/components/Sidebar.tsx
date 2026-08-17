import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChartColumn, faChartLine, faPaw, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";

type SidebarItem = {
  label: string;
  path: string;
  icon: IconProp;
};

const navigations: SidebarItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: faChartColumn,
  },
  {
    label: "Pet Management",
    path: "/pet-management",
    icon: faPaw,
  },
  {
    label: "User Management",
    path: "/user-management",
    icon: faUser,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: faChartLine,
  },
];

function Sidebar() {
  return (
    <>
      <aside className="min-h-screen max-w-68 w-68 p-2 border-r-2 border-gray-300">
        <div className="w-full py-2">
          <p className="text-gray-600">Main Menu</p>
        </div>
        <nav className="flex flex-col">
          {navigations.map((item: SidebarItem) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-x-2 p-2 rounded-sm border-l-6 transition-colors duration-75 cursor-pointer hover:bg-[hsl(19_100_94)] ${isActive ? "border-secondary bg-[hsl(19_100_94)]" : "border-transparent"}`
              }
            >
              {({ isActive }) => (
                <>
                  <FontAwesomeIcon icon={item.icon} className={`${isActive ? "text-secondary" : "text-text"}`} />
                  <p className={`${isActive ? "text-secondary" : "text-text"}`}>{item.label}</p>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
