import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaBars, FaChevronDown, FaChevronRight } from "react-icons/fa";

const Sidebar = ({ routes }) => {
  const [open, setOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const router = useRouter();

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const isActive = (path) => router.pathname === path;

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-blue-600 text-white"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`relative top-0  left-0 min-h-screen h-full w-64 bg-white shadow-lg transition-transform
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* <div className="p-4 border-b font-bold text-xl text-blue-600">
          Healthy Habitat
        </div> */}

        <nav className="p-4 space-y-2">
          {routes.map((route, i) => (
            <div key={i}>
              {/* Top-level Link */}
              <div className="flex items-center justify-between">
                <Link
                  href={route.path}
                  className={`block px-3 py-2 rounded hover:bg-blue-50 ${
                    isActive(route.path) ? "bg-blue-100 text-blue-700" : ""
                  }`}
                >
                  {route.title}
                </Link>

                {/* Expand Icon if subRoutes */}
                {route.subRoutes && (
                  <button
                    onClick={() => toggleMenu(route.title)}
                    className="p-1"
                  >
                    {openMenus[route.title] ? (
                      <FaChevronDown size={12} />
                    ) : (
                      <FaChevronRight size={12} />
                    )}
                  </button>
                )}
              </div>

              {/* Subroutes */}
              {route.subRoutes && openMenus[route.title] && (
                <div className="ml-4 mt-1 space-y-1">
                  {route.subRoutes.map((sub, j) => (
                    <Link
                      key={j}
                      href={sub.path}
                      className={`block px-3 py-2 rounded text-sm hover:bg-blue-50 ${
                        isActive(sub.path) ? "bg-blue-100 text-blue-700" : ""
                      }`}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
